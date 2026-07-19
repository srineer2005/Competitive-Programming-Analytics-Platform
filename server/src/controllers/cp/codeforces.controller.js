const asyncHandler = require("../../utils/asyncHandler");
const ApiResponse = require("../../utils/ApiResponse");

const HTTP_STATUS = require("../../constants/httpStatus");
const {
    getCodeforcesSubmissionHistory,
    getCodeforcesSubmissionStats,
    getCodeforcesProfile,
    getCodeforcesContestHistory,
    getCodeforcesSubmissionActivity,
    getCodeforcesDashboard, // <-- add this
} = require("../../services/cp/codeforces/service");
const {
    calculateContestStats,
} = require("../../services/analytics/contest.analytics");

const { syncContestHistory } = require("../../services/cp/codeforces/sync");

const {
    syncSubmissionHistory,
} = require("../../services/cp/codeforces/submission.sync");


const ApiError = require("../../utils/ApiError");
const syncCodeforcesData = asyncHandler(async (req, res) => {
    console.log("syncCodeforcesData called");
    const userId = req.user._id;

    const user = await findUserById(userId);
    console.log("User:", JSON.stringify(user, null, 2));

    if (!user?.codeforces) {
    throw new ApiError(
        HTTP_STATUS.BAD_REQUEST,
        "Codeforces handle not found."
    );
}

const handle = user.codeforces;

    const contestResult = await syncContestHistory(userId, handle);

    const submissionResult = await syncSubmissionHistory(
        userId,
        handle
    );

    return res.status(HTTP_STATUS.OK).json(
        new ApiResponse(
            HTTP_STATUS.OK,
            {
                contests: contestResult,
                submissions: submissionResult,
            },
            "Codeforces data synced successfully."
        )
    );
});


const { findUserById } = require("../../repositories/user.repository");


const getCodeforcesActivity = asyncHandler(async (req, res) => {
    const { handle } = req.params;

    const activity =
        await getCodeforcesSubmissionActivity(handle);

    return res.status(HTTP_STATUS.OK).json(
        new ApiResponse(
            HTTP_STATUS.OK,
            activity,
            "Submission activity fetched successfully"
        )
    );
});
const getCodeforcesSubmissionStatistics = asyncHandler(async (req, res) => {
    const { handle } = req.params;

    const stats = await getCodeforcesSubmissionStats(handle);

    return res.status(HTTP_STATUS.OK).json(
        new ApiResponse(
            HTTP_STATUS.OK,
            stats,
            "Submission statistics fetched successfully"
        )
    );
});

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
const getCodeforcesSubmissions = asyncHandler(async (req, res) => {
    const { handle } = req.params;

    const submissions = await getCodeforcesSubmissionHistory(handle);

    return res.status(HTTP_STATUS.OK).json(
        new ApiResponse(
            HTTP_STATUS.OK,
            submissions,
            "Submission history fetched successfully"
        )
    );
});
const getCodeforcesDashboardData = asyncHandler(async (req, res) => {
    const { handle } = req.params;

    const dashboard = await getCodeforcesDashboard(handle);

    return res.status(HTTP_STATUS.OK).json(
        new ApiResponse(
            HTTP_STATUS.OK,
            dashboard,
            "Dashboard fetched successfully"
        )
    );
});

module.exports = {
    getCodeforcesUser,
    getCodeforcesContests,
    getCodeforcesStats,
    getCodeforcesSubmissions,
    getCodeforcesSubmissionStatistics,
    getCodeforcesActivity,
    getCodeforcesDashboardData,
    syncCodeforcesData,

};