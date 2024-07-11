const db = require("../config/db");
const { v4: uuidv4 } = require("uuid");

const Order = {
  create: (orderData, callback) => {
    const { userId, items, status } = orderData;
    console.log("items :", items);
    // Initialize arrays to store item details and queries
    const itemNames = [];
    const itemQuantities = [];
    const insertValues = [];

    // Prepare queries for fetching item details and calculating costs
    const getItemQuery = "SELECT * FROM items WHERE itemname IN (?)";
    const insertOrderQuery =
      "INSERT INTO orders (order_id, user_id, item_name, quantity, item_cost, total_cost, status) VALUES ?";

    // Iterate through each item in the order
    items.forEach((item) => {
      itemNames.push(item.itemname);
      itemQuantities.push(item.quantity);
      var orderId = uuidv4();
      insertValues.push([
        orderId,
        userId,
        item.itemname,
        item.quantity,
        null,
        null,
        status,
      ]);
    });
    console.log("ItemNames :", itemNames);
    // Fetch item costs and calculate total costs
    db.query(getItemQuery, [itemNames], (err, results) => {
      if (err) {
        console.error(err);
        return callback(err);
      }

      console.log("result from items table", results);

      // Map item costs to item IDs
      const itemCostMap = {};
      results.forEach((row) => {
        itemCostMap[row.itemname] = row.itemcost;
      });

      console.log("itemCostMap :", itemCostMap);

      // Calculate total cost for each item and update insertValues
      // Calculate total cost for each item and update insertValues
      const orders = insertValues.map((insertData, index) => {
        const itemname = itemNames[index];
        const itemCost = itemCostMap[itemname];
        const quantity = itemQuantities[index];
        const totalCost = itemCost * quantity;

        // Update insertValues with calculated costs
        insertData[4] = itemCost; // item_cost
        insertData[5] = totalCost; // total_cost

        return {
          order_id: insertData[0],
          user_id: insertData[1],
          item_name: itemname,
          quantity: quantity,
          item_cost: itemCost,
          total_cost: totalCost,
          status: status,
        };
      });

      // Batch insert orders into database
      db.query(insertOrderQuery, [insertValues], (err, result) => {
        if (err) {
          console.error(err);
          return callback(err);
        }
        callback(null, orders);
      });
    });
  },

  delete: (orderId, callback) => {
    const query = "DELETE FROM orders WHERE order_id = ?";
    db.query(query, [orderId], callback);
  },

  getAllOrders: (callback) => {
    const query = "SELECT * FROM orders;";
    db.query(query, callback);
  },

  getOrderByUserId: (userId, callback) => {
    const query = "SELECT * from orders WHERE user_id = ?";
    db.query(query, [userId], callback);
  },

  getOrderByOrderId: (OrderId, callback) => {
    const query = "SELECT * from orders WHERE order_id = ?";
    db.query(query, [OrderId], callback);
  },

  getpendingOrders: (callback) => {
    const query = "SELECT * from orders WHERE status = ?";
    db.query(query, ["pending"], callback);
  },

  completeOrder: (orderId, callback) => {
    const query = "UPDATE orders SET status = ? WHERE order_id = ?";
    db.query(query, ["completed", orderId], callback);
  },
};

module.exports = Order;
