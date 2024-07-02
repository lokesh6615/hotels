const express = require("express");
const router = express.Router();
const waiterController = require("../controllers/waiterController");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

router.post("/login", waiterController.waiterLogin);
router.post("/register", waiterController.waiterRegister);
router.get(
  "/profile",
  authMiddleware,
  roleMiddleware(["waiter"]),
  waiterController.waiterProfile
);

module.exports = router;
