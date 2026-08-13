const Coupon = require("../models/Coupon");
const CouponUsage = require("../models/CouponUsage");

// =====================================================
// APPLY / VALIDATE COUPON
// =====================================================

const applyCoupon = async (req, res) => {
    try {
        const { code, orderAmount } = req.body;

        // -------------------------------------------------
        // BASIC VALIDATION
        // -------------------------------------------------

        if (!code) {
            return res.status(400).json({
                message: "Coupon code is required."
            });
        }

        if (orderAmount === undefined || orderAmount === null) {
            return res.status(400).json({
                message: "Order amount is required."
            });
        }

        const amount = Number(orderAmount);

        if (isNaN(amount) || amount < 0) {
            return res.status(400).json({
                message: "Invalid order amount."
            });
        }

        // -------------------------------------------------
        // FIND COUPON
        // -------------------------------------------------

        const coupon = await Coupon.findOne({
            code: code.trim().toUpperCase()
        });

        if (!coupon) {
            return res.status(404).json({
                message: "Invalid coupon code."
            });
        }

        // -------------------------------------------------
        // CHECK ACTIVE
        // -------------------------------------------------

        if (!coupon.isActive) {
            return res.status(400).json({
                message: "This coupon is no longer active."
            });
        }

        // -------------------------------------------------
        // CHECK EXPIRY
        // -------------------------------------------------

        if (
            coupon.expiresAt &&
            new Date() > coupon.expiresAt
        ) {
            return res.status(400).json({
                message: "This coupon has expired."
            });
        }

        // -------------------------------------------------
        // CHECK USAGE LIMIT
        // -------------------------------------------------

        if (
            coupon.usageLimit !== null &&
            coupon.usedCount >= coupon.usageLimit
        ) {
            return res.status(400).json({
                message: "This coupon has reached its usage limit."
            });
        }

        // -------------------------------------------------
        // CHECK MINIMUM ORDER
        // -------------------------------------------------

        if (amount < coupon.minOrder) {
            return res.status(400).json({
                message: `Minimum order value for this coupon is ₹${coupon.minOrder}.`
            });
        }

        // -------------------------------------------------
        // CHECK WHETHER USER ALREADY USED COUPON
        // -------------------------------------------------

        const previousUsage = await CouponUsage.findOne({
            user: req.user._id,
            coupon: coupon._id
        });

        if (previousUsage) {
            return res.status(400).json({
                message: "You have already used this coupon."
            });
        }

        // -------------------------------------------------
        // FIRST ORDER CHECK
        // -------------------------------------------------

        if (coupon.firstOrderOnly) {
            const previousOrderCount =
                await require("../models/Order").countDocuments({
                    user: req.user._id
                });

            if (previousOrderCount > 0) {
                return res.status(400).json({
                    message:
                        "This coupon is valid only for your first order."
                });
            }
        }

        // -------------------------------------------------
        // CALCULATE DISCOUNT
        // -------------------------------------------------

        let discount = 0;

        if (coupon.discountType === "percentage") {
            discount =
                (amount * coupon.discountValue) / 100;
        } else if (coupon.discountType === "fixed") {
            discount = coupon.discountValue;
        }

        // -------------------------------------------------
        // MAXIMUM DISCOUNT
        // -------------------------------------------------

        if (
            coupon.maxDiscount !== null &&
            discount > coupon.maxDiscount
        ) {
            discount = coupon.maxDiscount;
        }

        // -------------------------------------------------
        // DISCOUNT CANNOT EXCEED ORDER AMOUNT
        // -------------------------------------------------

        discount = Math.min(discount, amount);

        // Round to 2 decimal places
        discount = Math.round(discount * 100) / 100;

        // -------------------------------------------------
        // FINAL TOTAL
        // -------------------------------------------------

        const finalAmount =
            Math.max(amount - discount, 0);

        // -------------------------------------------------
        // SUCCESS RESPONSE
        // -------------------------------------------------

        return res.status(200).json({
            success: true,

            message: "Coupon applied successfully.",

            coupon: {
                id: coupon._id,
                code: coupon.code,
                title: coupon.title,
                description: coupon.description,
                discountType: coupon.discountType,
                discountValue: coupon.discountValue,
                minOrder: coupon.minOrder,
                maxDiscount: coupon.maxDiscount
            },

            discount,

            orderAmount: amount,

            finalAmount
        });

    } catch (error) {
        console.error(
            "Apply coupon error:",
            error
        );

        return res.status(500).json({
            message:
                "Something went wrong while applying the coupon."
        });
    }
};


// =====================================================
// GET AVAILABLE COUPONS
// =====================================================

const getCoupons = async (req, res) => {
    try {
        const coupons = await Coupon.find({
            isActive: true
        }).sort({
            createdAt: -1
        });

        const now = new Date();

        const validCoupons = coupons.filter(
            (coupon) => {
                return (
                    !coupon.expiresAt ||
                    coupon.expiresAt > now
                );
            }
        );

        return res.status(200).json({
            success: true,
            coupons: validCoupons
        });

    } catch (error) {
        console.error(
            "Get coupons error:",
            error
        );

        return res.status(500).json({
            message:
                "Unable to fetch coupons."
        });
    }
};


module.exports = {
    applyCoupon,
    getCoupons
};