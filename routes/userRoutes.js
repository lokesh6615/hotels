const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

router.post("/login", userController.userLogin);
router.post("/register", userController.userRegister);
router.get(
  "/profile",
  authMiddleware,
  roleMiddleware(["user"]),
  userController.userProfile
);

module.exports = router;
