const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/ApiResponse");

const HTTP_STATUS = require("../constants/httpStatus");
const MESSAGES = require("../constants/messages");

const {
    updateUserCodingProfiles,
    getUserCodingProfiles,
} = require("../services/user.service");

const updateCodingProfiles = asyncHandler(async (req, res) => {
    const updatedUser = await updateUserCodingProfiles(
        req.user.id,
        req.body
    );

    return res.status(HTTP_STATUS.OK).json(
        new ApiResponse(
            HTTP_STATUS.OK,
            updatedUser,
            MESSAGES.USER.CODING_PROFILES_UPDATED
        )
    );
});
const getCodingProfiles = asyncHandler(async (req, res) => {
    const profiles = await getUserCodingProfiles(req.user.id);

    return res.status(HTTP_STATUS.OK).json(
        new ApiResponse(
            HTTP_STATUS.OK,
            profiles,
            "Coding profiles fetched successfully."
        )
    );
});

module.exports = {
    updateCodingProfiles,
    getCodingProfiles,
};