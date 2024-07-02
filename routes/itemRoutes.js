const express = require("express");
const router = express.Router();
const itemController = require("../controllers/itemController");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

router.post(
  "/addItem",
  authMiddleware,
  roleMiddleware(["owner"]),
  itemController.addItem
);

router.delete(
  "/deleteItem",
  authMiddleware,
  roleMiddleware(["owner"]),
  itemController.deleteItem
);

router.get(
  "/getItemByName/:name",
  authMiddleware,
  roleMiddleware(["owner", "waiter", "user"]),
  itemController.getItemByName
);

router.get(
  "/getItems",
  authMiddleware,
  roleMiddleware(["owner", "waiter", "user"]),
  itemController.getAllItems
);

router.put(
  "/updateItem/:name",
  authMiddleware,
  roleMiddleware(["owner"]),
  itemController.updateItem
);

module.exports = router;
