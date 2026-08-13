const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        // Basic Information
        name: {
            type: String,
            required: true,
            trim: true
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },

        phone: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },

        password: {
            type: String,
            required: true
        },

        // Gender - used to determine default avatar
        gender: {
            type: String,
            enum: ["male", "female", "other"],
            default: "other"
        },

        // User Role
        role: {
            type: String,
            enum: ["user", "admin", "staff"],
            default: "user"
        },

        // Saved Addresses
        address: [
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
                    trim: true
                },

                isDefault: {
                    type: Boolean,
                    default: false
                }
            }
        ],

        // Account verification status
        isVerified: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("User", userSchema);