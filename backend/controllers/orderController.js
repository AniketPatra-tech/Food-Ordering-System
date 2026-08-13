const Order = require("../models/Order");


// =====================================================
// CREATE ORDER
// =====================================================

const createOrder = async (req, res) => {
    try {
        const userId = req.user._id;

        const {
            items,
            deliveryAddress,
            subtotal,
            deliveryFee,
            discount,
            total,
            paymentMethod,
            customerNote
        } = req.body;


        // Basic validation
        if (!items || !Array.isArray(items) || items.length === 0) {
            return res.status(400).json({
                message: "Your order must contain at least one item"
            });
        }


        if (!deliveryAddress) {
            return res.status(400).json({
                message: "Delivery address is required"
            });
        }


        if (!deliveryAddress.fullAddress) {
            return res.status(400).json({
                message: "Full delivery address is required"
            });
        }


        if (!deliveryAddress.city) {
            return res.status(400).json({
                message: "City is required"
            });
        }


        if (!deliveryAddress.state) {
            return res.status(400).json({
                message: "State is required"
            });
        }


        if (!deliveryAddress.pincode) {
            return res.status(400).json({
                message: "Pincode is required"
            });
        }


        if (!deliveryAddress.phone) {
            return res.status(400).json({
                message: "Delivery phone number is required"
            });
        }


        // Create order
        const order = await Order.create({
            user: userId,

            items,

            deliveryAddress,

            subtotal: Number(subtotal) || 0,

            deliveryFee: Number(deliveryFee) || 0,

            discount: Number(discount) || 0,

            total: Number(total) || 0,

            paymentMethod: paymentMethod || "cod",

            customerNote: customerNote || ""
        });


        res.status(201).json({
            message: "Order placed successfully",

            order
        });

    } catch (error) {
        console.error("Create order error:", error);

        res.status(500).json({
            message: "Failed to create order",
            error: error.message
        });
    }
};



// =====================================================
// GET MY ORDERS
// =====================================================

const getMyOrders = async (req, res) => {
    try {
        const orders = await Order.find({
            user: req.user._id
        })
            .sort({
                createdAt: -1
            });


        res.status(200).json({
            orders
        });

    } catch (error) {
        console.error("Get orders error:", error);

        res.status(500).json({
            message: "Failed to fetch orders",
            error: error.message
        });
    }
};



// =====================================================
// GET SINGLE ORDER
// =====================================================

const getOrderById = async (req, res) => {
    try {
        const order = await Order.findOne({
            _id: req.params.id,
            user: req.user._id
        });


        if (!order) {
            return res.status(404).json({
                message: "Order not found"
            });
        }


        res.status(200).json({
            order
        });

    } catch (error) {
        console.error("Get order error:", error);

        res.status(500).json({
            message: "Failed to fetch order",
            error: error.message
        });
    }
};



// =====================================================
// CANCEL ORDER
// =====================================================

const cancelOrder = async (req, res) => {
    try {
        const order = await Order.findOne({
            _id: req.params.id,
            user: req.user._id
        });


        if (!order) {
            return res.status(404).json({
                message: "Order not found"
            });
        }


        // Prevent cancellation after preparation has started
        const nonCancellableStatuses = [
            "preparing",
            "ready",
            "out_for_delivery",
            "delivered",
            "cancelled"
        ];


        if (nonCancellableStatuses.includes(order.status)) {
            return res.status(400).json({
                message: `Order cannot be cancelled because it is already ${order.status.replaceAll(
                    "_",
                    " "
                )}`
            });
        }


        order.status = "cancelled";

        order.cancellationReason =
            req.body.reason || "Cancelled by customer";


        await order.save();


        res.status(200).json({
            message: "Order cancelled successfully",

            order
        });

    } catch (error) {
        console.error("Cancel order error:", error);

        res.status(500).json({
            message: "Failed to cancel order",
            error: error.message
        });
    }
};



module.exports = {
    createOrder,
    getMyOrders,
    getOrderById,
    cancelOrder
};