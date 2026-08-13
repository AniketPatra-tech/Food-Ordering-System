const express = require("express");

const {
    applyCoupon,
    getCoupons
} = require("../controllers/couponController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();


// =====================================================
// GET AVAILABLE COUPONS
// =====================================================

router.get(
    "/",
    protect,
    getCoupons
);


// =====================================================
// APPLY COUPON
// =====================================================

router.post(
    "/apply",
    protect,
    applyCoupon
);


module.exports = router;