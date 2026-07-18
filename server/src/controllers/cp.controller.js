const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/ApiResponse");

const HTTP_STATUS = require("../constants/httpStatus");

const {
    calculateContestStats,
} = require("../services/analytics/contest.analytics");

const {
    getCodeforcesProfile,
    getCodeforcesContestHistory,
} = require("../services/cp/codeforces.service");

const getCodeforcesUser = asyncHandler(async (req, res) => {
    const { handle } = req.params;

    const profile = await getCodeforcesProfile(handle);

    return res.status(HTTP_STATUS.OK).json(
        new ApiResponse(
            HTTP_STATUS.OK,
            profile,
            "Codeforces profile fetched successfully"
        )
    );
});
const getCodeforcesContests = asyncHandler(async (req, res) => {
    const { handle } = req.params;

    const contests = await getCodeforcesContestHistory(handle);

    return res.status(HTTP_STATUS.OK).json(
        new ApiResponse(
            HTTP_STATUS.OK,
            contests,
            "Contest history fetched successfully"
        )
    );
});
const getCodeforcesStats = asyncHandler(async (req, res) => {
    const { handle } = req.params;

    const contests = await getCodeforcesContestHistory(handle);

    const stats = calculateContestStats(contests);

    return res.status(HTTP_STATUS.OK).json(
        new ApiResponse(
            HTTP_STATUS.OK,
            stats,
            "Codeforces statistics fetched successfully"
        )
    );
});

module.exports = {
    getCodeforcesUser,
    getCodeforcesContests,
    getCodeforcesStats,
};