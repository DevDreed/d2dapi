const Order = require("../models/order");
const cuid = require("cuid");
const sanitizeHtml = require("sanitize-html");

/**
 * Get all orders
 * @param req
 * @param res
 * @returns void
 */
exports.getOrders = (req, res) => {
  Order.find().sort('-created_at').exec((err, orders) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ orders });
  });
}

exports.getOrdersByUserId = (req, res) => {
  Order.find().count().exec((err, orders) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ orders });
  });
}

exports.getWeeklyOrderCountByUserId = (req, res) => {
  console.log(req.user._id);
  Order.find({ user_id: req.user._id }).count().exec((err, orders) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ orders });
  });
}

/**
 * Save a order
 * @param req
 * @param res
 * @returns void
 */
exports.addOrder = (req, res, next) => {
  if (!req.body.order.firstName) {
    res.status(403).json({"userMessage":"Please fill out the entire form"});
    return next();
  }

  const newOrder = new Order(req.body.order);

  // Let's sanitize inputs
  newOrder.firstName = sanitizeHtml(newOrder.firstName);
  newOrder.lastName = sanitizeHtml(newOrder.lastName);
  newOrder.phone = sanitizeHtml(newOrder.phone);
  newOrder.email = sanitizeHtml(newOrder.email);
  newOrder.address1 = sanitizeHtml(newOrder.address1);
  newOrder.address2 = sanitizeHtml(newOrder.address2);
  newOrder.city = sanitizeHtml(newOrder.city);
  newOrder.state = sanitizeHtml(newOrder.state);
  newOrder.zipcode = sanitizeHtml(newOrder.zipcode);
  newOrder.location = newOrder.location;
  newOrder.cuid = cuid();
  newOrder.user_id = req.user._id;
  // newOrder.group_id = sanitizeHtml(req.body.group_id);
  newOrder.save((err, saved) => {
    if (err) {
      res.status(500).send(err);
      next(err);
    }
    res.json({ userMessage: saved });
  });
}

/**
 * Get a single order
 * @param req
 * @param res
 * @returns void
 */
exports.getOrder = (req, res) => {
  Order.findOne({ cuid: req.params.cuid }).exec((err, order) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ order });
  });
}

/**
 * Update a single order
 * @param req
 * @param res
 * @returns void
 */
exports.updateOrder = (req, res) => {
  Order.findOne({ cuid: req.params.cuid }).exec((err, order) => {
    if (err) {
      res.status(500).send(err);
    }

    // Let's sanitize inputs
  order.firstName = sanitizeHtml(req.body.order.firstName);
  order.lastName = sanitizeHtml(req.body.order.lastName);
  order.phone = sanitizeHtml(req.body.order.phone);
  order.email = sanitizeHtml(req.body.order.email);
  order.address1 = sanitizeHtml(req.body.order.address1);
  order.address2 = sanitizeHtml(req.body.order.address2);
  order.city = sanitizeHtml(req.body.order.city);
  order.state = sanitizeHtml(req.body.order.state);
  order.zipcode = sanitizeHtml(req.body.order.zipcode);
  order.location = order.location;
  order.save((err, saved) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ userMessage: saved });
  });
    
  });
}

/**
 * Delete a order
 * @param req
 * @param res
 * @returns void
 */
exports.deleteOrder = (req, res) => {
  Order.findOne({ cuid: req.params.cuid }).exec((err, order) => {
    if (err) {
      res.status(500).send(err);
    }

    order.remove(() => {
      res.status(200).end();
    });
  });
}
