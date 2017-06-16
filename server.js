const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const morgan = require("morgan");
const mongoose = require("mongoose");
const passport = require("passport");
const config = require("./config/database"); // get db config file
const port = process.env.PORT || 8080;
const jwt = require("jwt-simple");
const cors = require("cors");
const sanitizeHtml = require("sanitize-html");
const cuid = require('cuid');

// Routes
const UserRoutes = require('./app/routes/user.routes');
const AuthenticationRoutes = require('./app/routes/authentication.routes');
const OrderRoutes = require('./app/routes/order.routes');
const RoleRoutes = require('./app/routes/role.routes');

// get our request parameters
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// log to console
app.use(morgan("dev"));
app.use(cors());

// Use the passport package in our application
app.use(passport.initialize());

// demo Route (GET http://localhost:8080)
app.get("/", function(req, res) {
  res.send("Hello! The API is at http://localhost:" + port + "/api");
});

app.use('/api', OrderRoutes);
app.use('/api', RoleRoutes);
//app.use('/api', UserRoutes);
app.use('/api', AuthenticationRoutes);

// Start the server
app.listen(port);
console.log("There will be dragons: http://localhost:" + port);

// connect to database
mongoose.connect(config.database);


