const asyncHandler = require("../../utils/asyncHandler");
const ApiResponse = require("../../utils/ApiResponse");

const HTTP_STATUS = require("../../constants/httpStatus");

const {
    getLeetCodeProfile,
    getContestHistory,
    getDashboard,
} = require("../../services/cp/leetcode/service");
const { syncLeetCode } = require("../../services/cp/leetcode/sync");

const sync = asyncHandler(async (req, res) => {
    const result = await syncLeetCode(req.user);

    return res.status(HTTP_STATUS.OK).json(
        new ApiResponse(
            HTTP_STATUS.OK,
            result,
            "LeetCode synchronized successfully."
        )
    );
});

const getDashboardData = asyncHandler(async (req, res) => {
    const dashboard = await getDashboard(req.params.username);

    return res.status(HTTP_STATUS.OK).json(
        new ApiResponse(
            HTTP_STATUS.OK,
            dashboard,
            "Dashboard fetched successfully."
        )
    );
});

const getContests = asyncHandler(async (req, res) => {
    const contests = await getContestHistory(req.params.username);

    return res.status(HTTP_STATUS.OK).json(
        new ApiResponse(
            HTTP_STATUS.OK,
            contests,
            "Contest history fetched successfully."
        )
    );
});

const getProfile = asyncHandler(async (req, res) => {
    const profile = await getLeetCodeProfile(req.params.username);

    return res.status(HTTP_STATUS.OK).json(
        new ApiResponse(
            HTTP_STATUS.OK,
            profile,
            "LeetCode profile fetched successfully."
        )
    );
});

module.exports = {
    getProfile,
    getContests,
    getDashboardData,
    sync,
};