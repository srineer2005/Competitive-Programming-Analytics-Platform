const jwt = require("jsonwebtoken");

const User = require("../models/User");

const MESSAGES = require("../constants/messages");
const HTTP_STATUS = require("../constants/httpStatus");

const ApiError = require("../utils/ApiError");

const auth = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            throw new ApiError(
                HTTP_STATUS.UNAUTHORIZED,
                MESSAGES.AUTH.ACCESS_TOKEN_REQUIRED
            );
        }

        const token = authHeader.split(" ")[1];

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const { id } = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(id);

        if (!user) {
            throw new ApiError(
                HTTP_STATUS.UNAUTHORIZED,
                MESSAGES.AUTH.INVALID_TOKEN
            );
        }

        req.user = user;

        next();
    } catch (error) {
        next(
            new ApiError(
                HTTP_STATUS.UNAUTHORIZED,
                MESSAGES.AUTH.INVALID_TOKEN
            )
        );
    }
};

module.exports = auth;