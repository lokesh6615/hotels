const express = require("express");
const router = express.Router();
const waiterController = require("../controllers/waiterController");

router.post("/login", waiterController.waiterLogin);
router.post("/register", waiterController.waiterRegister);

module.exports = router;
