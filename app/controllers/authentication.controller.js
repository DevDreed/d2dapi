const crypto = require('crypto');
const User = require('../models/user');
const config = require('../../config/database');
const jwt = require("jwt-simple");

exports.signup = (req, res) => {
  if (!req.body.email || !req.body.password) {
    res.json({ success: false, msg: "Please fill out the complete form." });
  } else {
    var newUser = new User({
      email: req.body.email,
      password: req.body.password
    });

    // save the user
    newUser.save(function(err) {
      if (err) {
        return res.json({ success: false, msg: "Username already exists." });
      }
      res.json({ success: true, msg: "Successful created new user." });
    });
  }
};

exports.authenticate = (req, res) => {
  User.findOne(
    {
      email: req.body.email
    },
    function(err, user) {
      if (err) throw err;

      if (!user) {
        res.status(401).send({
          success: false,
          msg: "Authentication failed. User not found."
        });
      } else {
        // check if password matches
        user.comparePassword(req.body.password, function(err, isMatch) {
          if (isMatch && !err) {
            // if user is found and password is right create a token
            var token = jwt.encode(user, config.secret);
            // return the information including token as JSON
            res.json({ success: true, user, token: "JWT " + token });
          } else {
            res.send({
              success: false,
              msg: "Authentication failed. Wrong password."
            });
          }
        });
      }
    }
  );
}
