const express = require("express");
const router = express.Router();
const waiterController = require("../controllers/registerController");
const ownerController = require("../controllers/registerController");
const userController = require("../controllers/registerController");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

router.post("/owner", ownerController.ownerRegister);
router.post("/user", userController.userRegister);
router.post(
  "/waiter",
  authMiddleware,
  roleMiddleware(["owner"]),
  waiterController.waiterRegister
);

module.exports = router;
