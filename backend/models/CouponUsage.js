const mongoose = require("mongoose");

const couponUsageSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        coupon: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Coupon",
            required: true
        },

        code: {
            type: String,
            required: true,
            uppercase: true,
            trim: true
        },

        discountAmount: {
            type: Number,
            required: true,
            min: 0
        },

        order: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Order",
            default: null
        }
    },
    {
        timestamps: true
    }
);

couponUsageSchema.index(
    { user: 1, coupon: 1 },
    { unique: true }
);

module.exports = mongoose.model(
    "CouponUsage",
    couponUsageSchema
);