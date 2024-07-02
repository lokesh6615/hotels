const express = require("express");
const router = express.Router();
const ownerController = require("../controllers/ownerController");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

router.post("/login", ownerController.ownerLogin);
router.post("/register", ownerController.ownerRegister);
router.get(
  "/profile",
  authMiddleware,
  roleMiddleware(["owner"]),
  ownerController.ownerProfile
);

module.exports = router;
