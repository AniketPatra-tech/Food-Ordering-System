const dns = require("dns");

// Use Google DNS for MongoDB Atlas
dns.setServers([
    "8.8.8.8",
    "8.8.4.4"
]);

dns.setDefaultResultOrder("ipv4first");

const mongoose = require("mongoose");
const dotenv = require("dotenv");

const Coupon = require("../models/Coupon");

dotenv.config();

const seedCoupon = async () => {
    try {
        // Connect to MongoDB
        console.log("Connecting to MongoDB...");

        await mongoose.connect(process.env.MONGO_URI);

        console.log("MongoDB connected");

        // Remove existing FIRST30 coupon
        await Coupon.deleteOne({
            code: "FIRST30"
        });

        // Create FIRST30 coupon
        const coupon = await Coupon.create({
            code: "FIRST30",

            title: "Welcome Offer",

            description:
                "Get 30% OFF on your first Zestora order.",

            discountType: "percentage",

            discountValue: 30,

            minOrder: 149,

            maxDiscount: 150,

            usageLimit: 1000,

            usedCount: 0,

            firstOrderOnly: true,

            isActive: true,

            expiresAt: new Date(
                Date.now() +
                    30 * 24 * 60 * 60 * 1000
            )
        });

        console.log(
            "FIRST30 coupon created successfully!"
        );

        console.log({
            code: coupon.code,
            discount: `${coupon.discountValue}%`,
            minimumOrder: coupon.minOrder,
            maximumDiscount: coupon.maxDiscount,
            firstOrderOnly: coupon.firstOrderOnly,
            expiresAt: coupon.expiresAt
        });

        await mongoose.connection.close();

        process.exit(0);

    } catch (error) {
        console.error(
            "Coupon seed failed:",
            error.message
        );

        try {
            await mongoose.connection.close();
        } catch (closeError) {
            // Ignore connection close errors
        }

        process.exit(1);
    }
};

seedCoupon();