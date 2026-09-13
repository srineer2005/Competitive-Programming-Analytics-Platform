const User = require("../models/User");

const findUserByEmail = async (email) => {
    return await User.findOne({ email });
};

const findUserByUsername = async (username) => {
    return await User.findOne({ username });
};

const findUserByEmailWithPassword = async (email) => {
    return await User.findOne({ email }).select("+password");
};

const findUserByVerificationToken = async (token) => {
    return await User.findOne({
        emailVerificationToken: token,
    });
};

const findUserByPasswordResetToken = async (token) => {
    return await User.findOne({
        passwordResetToken: token,
    });
};

const createUser = async (userData) => {
    const user = await User.create(userData);

    return await User.findById(user._id).select("-password");
};

const findUserById = async (id) => {
    return await User.findById(id).select("-password");
};

const getCodingProfiles = async (userId) => {
    return await User.findById(userId).select(
        "codeforces leetcode codechef"
    );
};

const updateCodingProfiles = async (
    userId,
    profileData
) => {
    return await User.findByIdAndUpdate(
        userId,
        profileData,
        {
            new: true,
            runValidators: true,
        }
    ).select("-password");
};

const updateEmailVerification = async (
    userId,
    token,
    expires
) => {
    return await User.findByIdAndUpdate(
        userId,
        {
            emailVerificationToken: token,
            emailVerificationExpires: expires,
        },
        {
            new: true,
        }
    );
};
const markUserAsVerified = async (userId) => {
    return await User.findByIdAndUpdate(
        userId,
        {
            isEmailVerified: true,
            emailVerificationToken: "",
            emailVerificationExpires: null,
        },
        {
            new: true,
        }
    ).select("-password");
};

const updatePasswordReset = async (
    userId,
    token,
    expires
) => {
    return await User.findByIdAndUpdate(
        userId,
        {
            passwordResetToken: token,
            passwordResetExpires: expires,
        },
        {
            new: true,
        }
    );
};

module.exports = {
    findUserByEmail,
    findUserByUsername,
    findUserByEmailWithPassword,
    findUserByVerificationToken,
    findUserByPasswordResetToken,
    createUser,
    findUserById,
    getCodingProfiles,
    updateCodingProfiles,
    updateEmailVerification,
    updatePasswordReset,
    markUserAsVerified,
};