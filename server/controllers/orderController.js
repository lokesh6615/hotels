const Order = require("../models/orderModel");

// Controller to create a new order

exports.createOrder = (req, res) => {
  const newOrder = req.body;

  Order.create(newOrder, (err, orders) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Server error.");
    }

    // Ensure orders array is returned as expected
    res.status(201).json({ orders, msg: "Order created successfully." });
  });
};

// Controller to delete an order
exports.deleteOrder = (req, res) => {
  const orderId = req.params.id;

  Order.delete(orderId, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Server error.");
    }

    if (results.affectedRows === 0) {
      return res.status(404).send("Order not found.");
    }

    res.send({ order_id: orderId, msg: "Order deleted successfully." });
  });
};

exports.getAllOrders = (req, res) => {
  Order.getAllOrders((err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).send("server error.");
    }

    if (result.affectedRows === 0) {
      return res.status(404).send("No orders found.");
    }

    res.status(500).json({ result });
  });
};

exports.getOrderByUserId = (req, res) => {
  const userId = req.params.id;
  Order.getOrderByUserId(userId, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).send("server error.");
    }

    if (result.affectedRows === 0) {
      return res.status(404).send("No orders found.");
    }

    res.status(500).json({ result });
  });
};

exports.getOrderByOrderId = (req, res) => {
  const orderId = req.params.id;
  Order.getOrderByOrderId(orderId, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).send("server error.");
    }

    if (result.affectedRows === 0) {
      return res.status(404).send("No orders found.");
    }

    res.status(500).json({ result });
  });
};

exports.getpendingOrders = (req, res) => {
  Order.getpendingOrders((err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).send("server error.");
    }

    if (result.affectedRows === 0) {
      return res.status(404).send("No orders found.");
    }

    res.status(500).json({ result });
  });
};

exports.completeOrder = (req, res) => {
  const orderId = req.body.order_id;
  Order.completeOrder(orderId, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).send("server error.");
    }

    if (result.affectedRows === 0) {
      return res.status(404).send("No order found.");
    }

    res
      .status(500)
      .json({ msg: "Order completed successfully", order_id: orderId });
  });
};
