const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/ApiResponse");

const HTTP_STATUS = require("../constants/httpStatus");

const {
    getDashboard,
} = require("../services/dashboard.service");

const dashboard = asyncHandler(async (req, res) => {
    const data = await getDashboard(req.user._id);

    return res.status(HTTP_STATUS.OK).json(
        new ApiResponse(
            HTTP_STATUS.OK,
            data,
            "Dashboard fetched successfully."
        )
    );
});

module.exports = {
    dashboard,
};