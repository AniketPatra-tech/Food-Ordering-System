const express = require("express");

const router = express.Router();

const {
    createOrder,
    getMyOrders,
    getOrderById,
    cancelOrder
} = require("../controllers/orderController");

const protect = require("../middleware/authMiddleware");


// Create order
router.post(
    "/",
    protect,
    createOrder
);


// Get logged-in user's orders
router.get(
    "/my-orders",
    protect,
    getMyOrders
);


// Get single order
router.get(
    "/:id",
    protect,
    getOrderById
);


// Cancel order
router.put(
    "/:id/cancel",
    protect,
    cancelOrder
);


module.exports = router;