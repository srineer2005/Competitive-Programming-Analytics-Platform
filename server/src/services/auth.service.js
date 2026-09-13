const bcrypt = require("bcrypt");
const crypto = require("crypto");
const { OAuth2Client } = require("google-auth-library");
const { generateToken } = require("../utils/jwt");
const HTTP_STATUS = require("../constants/httpStatus");
const MESSAGES = require("../constants/messages");

const ApiError = require("../utils/ApiError");

const {
    findUserByEmail,
    findUserByUsername,
    findUserByEmailWithPassword,
    findUserByPasswordResetToken,
    findUserById,
    createUser,
    updatePasswordReset,
    markUserAsVerified,
} = require("../repositories/user.repository");

const {
    sendPasswordResetEmail,
} = require("./email.service");

const registerUser = async (userData) => {
    const normalizedEmail =
        userData.email.trim().toLowerCase();

    const normalizedUsername =
        userData.username.trim().toLowerCase();

    const existingUserByEmail =
        await findUserByEmail(normalizedEmail);

    if (existingUserByEmail) {
        throw new ApiError(
            HTTP_STATUS.CONFLICT,
            MESSAGES.AUTH.USER_EXISTS
        );
    }

    const existingUserByUsername =
        await findUserByUsername(normalizedUsername);

    if (existingUserByUsername) {
        throw new ApiError(
            HTTP_STATUS.CONFLICT,
            "Username is already taken."
        );
    }

    const hashedPassword = await bcrypt.hash(
        userData.password,
        10
    );

    const verificationToken =
        crypto.randomBytes(32).toString("hex");

    const verificationTokenExpires =
        new Date(
            Date.now() + 24 * 60 * 60 * 1000
        );

    const newUser = {
        ...userData,
        email: normalizedEmail,
        username: normalizedUsername,
        password: hashedPassword,
        isEmailVerified: false,
        emailVerificationToken:
            verificationToken,
        emailVerificationExpires:
            verificationTokenExpires,
    };

    const createdUser = await createUser(newUser);

    return {
        user: createdUser,
    };
};





const forgotPassword = async (email) => {
    const normalizedEmail =
        email.trim().toLowerCase();

    const user =
        await findUserByEmail(normalizedEmail);

    if (!user) {
        throw new ApiError(
            HTTP_STATUS.NOT_FOUND,
            "No account found with this email."
        );
    }

    if (!user.isEmailVerified) {
        throw new ApiError(
            HTTP_STATUS.FORBIDDEN,
            "Please verify your email before resetting your password."
        );
    }

    const resetToken =
        crypto.randomBytes(32).toString("hex");

    const resetTokenExpires =
        new Date(
            Date.now() + 30 * 60 * 1000
        );

    await updatePasswordReset(
        user._id,
        resetToken,
        resetTokenExpires
    );

    await sendPasswordResetEmail(
        normalizedEmail,
        user.username,
        resetToken
    );

    return {
        message:
            "A password reset email has been sent.",
    };
};

const resetPassword = async (
    token,
    newPassword
) => {
    if (!token) {
        throw new ApiError(
            HTTP_STATUS.BAD_REQUEST,
            "Password reset token is required."
        );
    }

    const user =
        await findUserByPasswordResetToken(token);

    if (!user) {
        throw new ApiError(
            HTTP_STATUS.BAD_REQUEST,
            "Invalid password reset token."
        );
    }

    if (
        !user.passwordResetExpires ||
        user.passwordResetExpires < new Date()
    ) {
        throw new ApiError(
            HTTP_STATUS.BAD_REQUEST,
            "Password reset token has expired."
        );
    }

    const hashedPassword =
        await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;
    user.passwordResetToken = "";
    user.passwordResetExpires = null;

    await user.save();

    return {
        message:
            "Password has been reset successfully.",
    };
};

const loginUser = async (loginData) => {
    const user = await findUserByEmailWithPassword(
        loginData.email.trim().toLowerCase()
    );

    if (!user) {
        throw new ApiError(
            HTTP_STATUS.UNAUTHORIZED,
            MESSAGES.AUTH.INVALID_CREDENTIALS
        );
    }

    const isPasswordCorrect =
        await bcrypt.compare(
            loginData.password,
            user.password
        );

    if (!isPasswordCorrect) {
        throw new ApiError(
            HTTP_STATUS.UNAUTHORIZED,
            MESSAGES.AUTH.INVALID_CREDENTIALS
        );
    }

    if (!user.isEmailVerified) {
        throw new ApiError(
            HTTP_STATUS.FORBIDDEN,
            "Please verify your account before logging in."
        );
    }

    const token = generateToken({
        id: user._id,
    });

    user.password = undefined;

    return {
        user,
        token,
    };
};
const googleVerifyUser = async (credential, expectedEmail) => {
    const client = new OAuth2Client(
        process.env.GOOGLE_CLIENT_ID
    );

    const ticket = await client.verifyIdToken({
        idToken: credential,
        audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    if (!payload || !payload.email || !payload.email_verified) {
        throw new ApiError(
            HTTP_STATUS.UNAUTHORIZED,
            "Google account email is not verified."
        );
    }

    const googleEmail = payload.email
        .trim()
        .toLowerCase();

    const accountEmail = expectedEmail
        .trim()
        .toLowerCase();

    if (googleEmail !== accountEmail) {
        throw new ApiError(
            HTTP_STATUS.FORBIDDEN,
            "Google account email does not match your registered email."
        );
    }

    const user = await findUserByEmail(accountEmail);

    if (!user) {
        throw new ApiError(
            HTTP_STATUS.NOT_FOUND,
            "No account found with this email."
        );
    }

    const verifiedUser = await markUserAsVerified(
        user._id
    );

    const token = generateToken({
        id: verifiedUser._id,
    });

    return {
        user: verifiedUser,
        token,
    };
};
const googlePasswordReset = async (
    credential,
    expectedEmail
) => {
    const client = new OAuth2Client(
        process.env.GOOGLE_CLIENT_ID
    );

    const ticket = await client.verifyIdToken({
        idToken: credential,
        audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    if (!payload || !payload.email || !payload.email_verified) {
        throw new ApiError(
            HTTP_STATUS.UNAUTHORIZED,
            "Google account email is not verified."
        );
    }

    const googleEmail = payload.email
        .trim()
        .toLowerCase();

    const accountEmail = expectedEmail
        .trim()
        .toLowerCase();

    if (googleEmail !== accountEmail) {
        throw new ApiError(
            HTTP_STATUS.FORBIDDEN,
            "Google account email does not match your registered email."
        );
    }

    const user = await findUserByEmail(accountEmail);

    if (!user) {
        throw new ApiError(
            HTTP_STATUS.NOT_FOUND,
            "No account found with this email."
        );
    }

    const resetToken =
        crypto.randomBytes(32).toString("hex");

    const resetTokenExpires =
        new Date(
            Date.now() + 30 * 60 * 1000
        );

    await updatePasswordReset(
        user._id,
        resetToken,
        resetTokenExpires
    );

    return {
        resetToken,
    };
};

const getCurrentUser = async (userId) => {
    const user = await findUserById(userId);

    if (!user) {
        throw new ApiError(
            HTTP_STATUS.NOT_FOUND,
            MESSAGES.AUTH.USER_NOT_FOUND
        );
    }

    return user;
};

module.exports = {
    registerUser,
    forgotPassword,
    resetPassword,
    loginUser,
    getCurrentUser,
    markUserAsVerified,
    googleVerifyUser,
    googlePasswordReset,
};