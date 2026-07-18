const bcrypt = require("bcrypt");
const { generateToken } = require("../utils/jwt");
const HTTP_STATUS = require("../constants/httpStatus");
const MESSAGES = require("../constants/messages");

const ApiError = require("../utils/ApiError");

const {
    findUserByEmail,
    findUserByEmailWithPassword,
    findUserById,
    createUser,
} = require("../repositories/user.repository");

const registerUser = async (userData) => {

    // Check if user already exists
    const existingUser = await findUserByEmail(userData.email);

    if (existingUser) {
        throw new ApiError(
            HTTP_STATUS.CONFLICT,
            MESSAGES.AUTH.USER_EXISTS
        );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(userData.password, 10);

    // Create new user object
    const newUser = {
        ...userData,
        password: hashedPassword,
    };

    // Save user
    const createdUser = await createUser(newUser);

    return createdUser;
};
const loginUser = async (loginData) => {

    const user = await findUserByEmailWithPassword(loginData.email);

    if (!user) {
        throw new ApiError(
            HTTP_STATUS.UNAUTHORIZED,
            MESSAGES.AUTH.INVALID_CREDENTIALS
        );
    }

    const isPasswordCorrect = await bcrypt.compare(
        loginData.password,
        user.password
    );

    if (!isPasswordCorrect) {
        throw new ApiError(
            HTTP_STATUS.UNAUTHORIZED,
            MESSAGES.AUTH.INVALID_CREDENTIALS
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
    loginUser,
    getCurrentUser,
};