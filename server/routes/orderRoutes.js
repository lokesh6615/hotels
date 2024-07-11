const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

// POST /api/orders/createOrder - Create a new order (authenticated route)
router.post(
  "/createOrder",
  authMiddleware,
  roleMiddleware(["user"]),
  orderController.createOrder
);

// DELETE /api/orders/deleteOrder/:id - Delete an order by ID (authenticated route)
router.delete(
  "/deleteOrder/:id",
  authMiddleware,
  roleMiddleware(["user"]),
  orderController.deleteOrder
);

router.get(
  "/getAllOrders",
  authMiddleware,
  roleMiddleware(["owner"]),
  orderController.getAllOrders
);

router.get(
  "/getOrderByUserId/:id",
  authMiddleware,
  roleMiddleware(["owner", "user"]),
  orderController.getOrderByUserId
);

router.get(
  "/getpendingOrders",
  authMiddleware,
  roleMiddleware(["owner", "waiter"]),
  orderController.getpendingOrders
);

router.post(
  "/completeOrder",
  authMiddleware,
  roleMiddleware(["waiter"]),
  orderController.completeOrder
);

router.get(
  "/getOrderByOrderId/:id",
  authMiddleware,
  roleMiddleware(["owner", "user"]),
  orderController.getOrderByOrderId
);

module.exports = router;
