const mongoose = require("mongoose");

const couponSchema = new mongoose.Schema(
    {
        code: {
            type: String,
            required: true,
            unique: true,
            uppercase: true,
            trim: true
        },

        title: {
            type: String,
            required: true,
            trim: true
        },

        description: {
            type: String,
            trim: true
        },

        discountType: {
            type: String,
            enum: ["percentage", "fixed"],
            required: true
        },

        discountValue: {
            type: Number,
            required: true,
            min: 0
        },

        minOrder: {
            type: Number,
            default: 0,
            min: 0
        },

        maxDiscount: {
            type: Number,
            default: null
        },

        usageLimit: {
            type: Number,
            default: null
        },

        usedCount: {
            type: Number,
            default: 0
        },

        firstOrderOnly: {
            type: Boolean,
            default: false
        },

        isActive: {
            type: Boolean,
            default: true
        },

        expiresAt: {
            type: Date,
            default: null
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Coupon", couponSchema);