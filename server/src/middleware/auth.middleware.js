const jwt = require("jsonwebtoken");
const MESSAGES = require("../constants/messages");
const ApiError = require("../utils/ApiError");
const HTTP_STATUS = require("../constants/httpStatus");

const auth = (req, res, next) => {
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

        req.user = decoded;

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