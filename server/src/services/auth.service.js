const bcrypt = require("bcrypt");
const crypto = require("crypto");

const { generateToken } = require("../utils/jwt");
const HTTP_STATUS = require("../constants/httpStatus");
const MESSAGES = require("../constants/messages");

const ApiError = require("../utils/ApiError");

const {
    findUserByEmail,
    findUserByUsername,
    findUserByEmailWithPassword,
    findUserByVerificationToken,
    findUserByPasswordResetToken,
    findUserById,
    createUser,
    updateEmailVerification,
    updatePasswordReset,
} = require("../repositories/user.repository");

const {
    sendVerificationEmail,
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

    await sendVerificationEmail(
        normalizedEmail,
        normalizedUsername,
        verificationToken
    );

    return {
        user: createdUser,
    };
};

const verifyEmail = async (token) => {
    if (!token) {
        throw new ApiError(
            HTTP_STATUS.BAD_REQUEST,
            "Verification token is required."
        );
    }

    const user =
        await findUserByVerificationToken(token);

    if (!user) {
        throw new ApiError(
            HTTP_STATUS.BAD_REQUEST,
            "Invalid verification token."
        );
    }

    if (user.isEmailVerified) {
        return {
            message: "Email is already verified.",
        };
    }

    if (
        !user.emailVerificationExpires ||
        user.emailVerificationExpires < new Date()
    ) {
        throw new ApiError(
            HTTP_STATUS.BAD_REQUEST,
            "Verification token has expired."
        );
    }

    user.isEmailVerified = true;
    user.emailVerificationToken = "";
    user.emailVerificationExpires = null;

    await user.save();

    return {
        message: "Email verified successfully.",
    };
};

const resendVerificationEmail = async (email) => {
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

    if (user.isEmailVerified) {
        throw new ApiError(
            HTTP_STATUS.BAD_REQUEST,
            "This email is already verified."
        );
    }

    const verificationToken =
        crypto.randomBytes(32).toString("hex");

    const verificationTokenExpires =
        new Date(
            Date.now() + 24 * 60 * 60 * 1000
        );

    await updateEmailVerification(
        user._id,
        verificationToken,
        verificationTokenExpires
    );

    await sendVerificationEmail(
        normalizedEmail,
        user.username,
        verificationToken
    );

    return {
        message:
            "A new verification email has been sent.",
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
            "Please verify your email before logging in."
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
    verifyEmail,
    resendVerificationEmail,
    forgotPassword,
    resetPassword,
    loginUser,
    getCurrentUser,
};