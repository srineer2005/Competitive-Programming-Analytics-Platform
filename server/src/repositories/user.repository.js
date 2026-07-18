const User = require("../models/User");

const findUserByEmail = async (email) => {
    return await User.findOne({ email });
};

const findUserByEmailWithPassword = async (email) => {
    return await User.findOne({ email }).select("+password");
};

const createUser = async (userData) => {
    const user = await User.create(userData);

    return await User.findById(user._id).select("-password");
};

const findUserById = async (id) => {
    return await User.findById(id).select("-password");
};

const updateCodingProfiles = async (userId, profileData) => {
    return await User.findByIdAndUpdate(
        userId,
        profileData,
        {
            new: true,
            runValidators: true,
        }
    ).select("-password");
};

module.exports = {
    findUserByEmail,
    findUserByEmailWithPassword,
    createUser,
    findUserById,
    updateCodingProfiles,
};