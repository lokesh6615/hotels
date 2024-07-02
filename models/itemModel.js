const db = require("../config/db");
const { getItemByName } = require("../controllers/itemController");

const Item = {
  getAllItems: (callback) => {
    const get_item = "SELECT * from items";
    db.query(get_item, callback);
  },
  getItemByName: (item, callback) => {
    const get_item = "SELECT * from items WHERE itemname = ?";
    db.query(get_item, item, callback);
  },
  addItem: (item, callback) => {
    const add_item = "INSERT INTO items SET ?";
    db.query(add_item, item, callback);
  },
  deleteItem: (item, callback) => {
    const delete_item = "DELETE FROM items WHERE itemname = ?";
    db.query(delete_item, item, callback);
  },
  updateItem: (itemname, updatedItem, callback) => {
    const query = "UPDATE items SET ? WHERE itemname = ?";
    db.query(query, [updatedItem, itemname], callback);
  },
};

module.exports = Item;
