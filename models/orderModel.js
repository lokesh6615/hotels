const db = require("../config/db");

const Order = {
  create: (orderData, callback) => {
    const { userId, itemId, quantity, status } = orderData;
    const query =
      "INSERT INTO orders (user_id, item_id, quantity, status) VALUES (?, ?, ?, ?)";
    db.query(query, [userId, itemId, quantity, status], callback);
  },

  delete: (orderId, callback) => {
    const query = "DELETE FROM orders WHERE id = ?";
    db.query(query, [orderId], callback);
  },
};

module.exports = Order;
