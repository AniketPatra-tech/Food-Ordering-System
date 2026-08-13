const User = require("../models/User");

// Get Addresses
const getAddresses = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("address");

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.status(200).json({
            addresses: user.address
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

// Add Address
const addAddress = async (req, res) => {
    try {
        const {
            type,
            fullAddress,
            landmark,
            city,
            state,
            pincode,
            phone,
            isDefault
        } = req.body;

        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        if (isDefault) {
            user.address.forEach((address) => {
                address.isDefault = false;
            });
        }

        if (user.address.length === 0) {
            req.body.isDefault = true;
        }

        user.address.push({
            type,
            fullAddress,
            landmark,
            city,
            state,
            pincode,
            phone,
            isDefault: user.address.length === 0 ? true : isDefault
        });

        await user.save();

        res.status(201).json({
            message: "Address added successfully",
            addresses: user.address
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

// Update Address
const updateAddress = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            type,
            fullAddress,
            landmark,
            city,
            state,
            pincode,
            phone,
            isDefault
        } = req.body;

        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        const address = user.address.id(id);

        if (!address) {
            return res.status(404).json({
                message: "Address not found"
            });
        }

        if (isDefault) {
            user.address.forEach((item) => {
                item.isDefault = false;
            });
        }

        address.type = type;
        address.fullAddress = fullAddress;
        address.landmark = landmark;
        address.city = city;
        address.state = state;
        address.pincode = pincode;
        address.phone = phone;
        address.isDefault = isDefault;

        await user.save();

        res.status(200).json({
            message: "Address updated successfully",
            addresses: user.address
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

// Delete Address
const deleteAddress = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        const address = user.address.id(id);

        if (!address) {
            return res.status(404).json({
                message: "Address not found"
            });
        }

        const wasDefault = address.isDefault;

        address.deleteOne();

        if (wasDefault && user.address.length > 0) {
            user.address[0].isDefault = true;
        }

        await user.save();

        res.status(200).json({
            message: "Address deleted successfully",
            addresses: user.address
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

// Set Default Address
const setDefaultAddress = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        const address = user.address.id(id);

        if (!address) {
            return res.status(404).json({
                message: "Address not found"
            });
        }

        user.address.forEach((item) => {
            item.isDefault = false;
        });

        address.isDefault = true;

        await user.save();

        res.status(200).json({
            message: "Default address updated successfully",
            addresses: user.address
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

module.exports = {
    getAddresses,
    addAddress,
    updateAddress,
    deleteAddress,
    setDefaultAddress
};