const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema(
    {
        foodId: {
            type: String,
            required: true
        },

        name: {
            type: String,
            required: true,
            trim: true
        },

        image: {
            type: String,
            default: ""
        },

        price: {
            type: Number,
            required: true,
            min: 0
        },

        quantity: {
            type: Number,
            required: true,
            min: 1
        },

        category: {
            type: String,
            default: ""
        },

        foodType: {
            type: String,
            enum: ["veg", "nonveg", "egg", "other"],
            default: "other"
        }
    },
    {
        _id: false
    }
);


const deliveryAddressSchema = new mongoose.Schema(
    {
        type: {
            type: String,
            enum: ["home", "work", "other"],
            default: "home"
        },

        fullAddress: {
            type: String,
            required: true,
            trim: true
        },

        landmark: {
            type: String,
            default: "",
            trim: true
        },

        city: {
            type: String,
            required: true,
            trim: true
        },

        state: {
            type: String,
            required: true,
            trim: true
        },

        pincode: {
            type: String,
            required: true,
            trim: true
        },

        phone: {
            type: String,
            required: true,
            trim: true
        }
    },
    {
        _id: false
    }
);


const orderSchema = new mongoose.Schema(
    {
        // Customer
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        // Order items
        items: {
            type: [orderItemSchema],
            required: true,
            validate: {
                validator: function (items) {
                    return items.length > 0;
                },
                message: "Order must contain at least one item"
            }
        },

        // Delivery address snapshot
        deliveryAddress: {
            type: deliveryAddressSchema,
            required: true
        },

        // Price details
        subtotal: {
            type: Number,
            required: true,
            min: 0
        },

        deliveryFee: {
            type: Number,
            default: 0,
            min: 0
        },

        discount: {
            type: Number,
            default: 0,
            min: 0
        },

        total: {
            type: Number,
            required: true,
            min: 0
        },

        // Payment
        paymentMethod: {
            type: String,
            enum: [
                "cod",
                "online",
                "upi",
                "card"
            ],
            default: "cod"
        },

        paymentStatus: {
            type: String,
            enum: [
                "pending",
                "paid",
                "failed",
                "refunded"
            ],
            default: "pending"
        },

        // Order status
        status: {
            type: String,
            enum: [
                "placed",
                "confirmed",
                "preparing",
                "ready",
                "out_for_delivery",
                "delivered",
                "cancelled"
            ],
            default: "placed"
        },

        // Optional notes from customer
        customerNote: {
            type: String,
            default: "",
            trim: true,
            maxlength: 500
        },

        // Cancellation
        cancellationReason: {
            type: String,
            default: ""
        }
    },
    {
        timestamps: true
    }
);


module.exports = mongoose.model("Order", orderSchema);