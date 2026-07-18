const HTTP_STATUS = require("../constants/httpStatus");
const MESSAGES = require("../constants/messages");
const {
    registerUser,
    loginUser,
    getCurrentUser,
} = require("../services/auth.service");

const ApiResponse = require("../utils/ApiResponse");
const asyncHandler = require("../utils/asyncHandler");

const register = asyncHandler(async (req, res) => {

    const createdUser = await registerUser(req.body);

    return res.status(HTTP_STATUS.CREATED).json(
        new ApiResponse(
            HTTP_STATUS.CREATED,
            createdUser,
            MESSAGES.AUTH.REGISTER_SUCCESS
        )
    );

});
const login = asyncHandler(async (req, res) => {

    const { user, token } = await loginUser(req.body);

    return res.status(HTTP_STATUS.OK).json(
        new ApiResponse(
            HTTP_STATUS.OK,
            {
                user,
                token,
            },
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

module.exports = {
    register,
    login,
    me,
};