const Item = require("../models/itemModel");

exports.addItem = async (req, res) => {
  const { item_name, item_cost } = req.body;

  // Check if the item already exists in the database
  Item.getItemByName(item_name, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Server error.");
    }

    if (result.length > 0) {
      return res.status(400).send("Item already exists.");
    }

    // Item does not exist, proceed with adding
    const new_item = { itemname: item_name, itemcost: item_cost };
    Item.addItem(new_item, (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).send("Server error.");
      }
      res.send({ msg: "Item added successfully", item: new_item });
    });
  });
};

exports.deleteItem = async (req, res) => {
  const item = req.body;
  const item_to_delete = item.item_name;
  Item.deleteItem(item_to_delete, (err, result) => {
    if (err) throw err;

    if (result.affectedRows === 0) {
      return res.status(404).send("Item not found.");
    }

    res.send({ msg: "Item deleted successfully", item: item_to_delete });
  });
};

exports.getItemByName = async (req, res) => {
  const item_name = req.params.name;
  Item.getItemByName(item_name, (err, result) => {
    if (err) throw err;

    if (result.affectedRows === 0) {
      return res.status(404).send("Item not found.");
    }

    res.send({ result });
  });
};

exports.getAllItems = async (req, res) => {
  Item.getAllItems((err, result) => {
    if (err) throw err;

    if (result.affectedRows === 0) {
      return res.status(404).send("Items not found.");
    }

    res.send({ result });
  });
};

exports.updateItem = (req, res) => {
  const item = req.params.name;
  const { itemname, itemcost } = req.body;

  const updatedItem = {
    itemname,
    itemcost,
  };

  Item.updateItem(item, updatedItem, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Server error.");
    }

    if (results.affectedRows === 0) {
      return res.status(404).send("Item not found.");
    }

    res.send("Item updated successfully.");
  });
};
