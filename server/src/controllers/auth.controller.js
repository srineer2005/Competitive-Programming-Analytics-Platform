const HTTP_STATUS = require("../constants/httpStatus");
const MESSAGES = require("../constants/messages");

const {
    registerUser,
    forgotPassword,
    resetPassword,
    loginUser,
    getCurrentUser,
    googleVerifyUser,
    googlePasswordReset,
} = require("../services/auth.service");

const ApiResponse = require("../utils/ApiResponse");
const asyncHandler = require("../utils/asyncHandler");

const register = asyncHandler(async (req, res) => {
    const { user: createdUser } = await registerUser(req.body);

    return res.status(HTTP_STATUS.CREATED).json(
        new ApiResponse(
            HTTP_STATUS.CREATED,
            { user: createdUser },
            MESSAGES.AUTH.REGISTER_SUCCESS
        )
    );
});


const forgot = asyncHandler(async (req, res) => {
    const result = await forgotPassword(
        req.body.email
    );

    return res.status(HTTP_STATUS.OK).json(
        new ApiResponse(
            HTTP_STATUS.OK,
            null,
            result.message
        )
    );
});

const reset = asyncHandler(async (req, res) => {
    const result = await resetPassword(
        req.body.token,
        req.body.newPassword
    );

    return res.status(HTTP_STATUS.OK).json(
        new ApiResponse(
            HTTP_STATUS.OK,
            null,
            result.message
        )
    );
});

const login = asyncHandler(async (req, res) => {
    const { user, token } = await loginUser(req.body);

    return res.status(HTTP_STATUS.OK).json(
        new ApiResponse(
            HTTP_STATUS.OK,
            { user, token },
            MESSAGES.AUTH.LOGIN_SUCCESS
        )
    );
});

const me = asyncHandler(async (req, res) => {
    const user = await getCurrentUser(req.user.id);

    return res.status(HTTP_STATUS.OK).json(
        new ApiResponse(
            HTTP_STATUS.OK,
            user,
            MESSAGES.AUTH.USER_FETCH_SUCCESS
        )
    );
});
const googleVerify = asyncHandler(async (req, res) => {
    const { credential, expectedEmail } = req.body;

    const { user, token } = await googleVerifyUser(
        credential,
        expectedEmail
    );

    return res.status(HTTP_STATUS.OK).json(
        new ApiResponse(
            HTTP_STATUS.OK,
            { user, token },
            "Google verification successful."
        )
    );
});
const googlePasswordResetController = async (req, res, next) => {
    try {
        const { credential, expectedEmail } = req.body;

        const result = await googlePasswordReset(
            credential,
            expectedEmail
        );

        res.status(HTTP_STATUS.OK).json({
            success: true,
            data: result,
            message: "Google verification successful.",
        });
    } catch (error) {
        next(error);
    }
};


module.exports = {
    register,
    forgot,
    reset,
    login,
    me,
    googleVerify,
    googlePasswordResetController,
};