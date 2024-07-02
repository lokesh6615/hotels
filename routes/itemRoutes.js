const express = require("express");
const router = express.Router();
const itemController = require("../controllers/itemController");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

router.post(
  "/addItem",
  authMiddleware,
  roleMiddleware(["owner", "waiter"]),
  itemController.addItem
);

router.delete(
  "/deleteItem",
  authMiddleware,
  roleMiddleware(["owner", "waiter"]),
  itemController.deleteItem
);

router.get(
  "/getItemByName/:name",
  authMiddleware,
  roleMiddleware(["owner", "waiter"]),
  itemController.getItemByName
);

router.get(
  "/getItems",
  authMiddleware,
  roleMiddleware(["owner", "waiter"]),
  itemController.getAllItems
);

router.put(
  "/updateItem/:name",
  authMiddleware,
  roleMiddleware(["owner", "waiter"]),
  itemController.updateItem
);

module.exports = router;
