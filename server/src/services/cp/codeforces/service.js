const axios = require("axios");

const { mapCodeforcesProfile } = require("../../../mappers/codeforces.mapper");

const {
    mapCodeforcesContestHistory,
} = require("../../../mappers/contest.mapper");

const {
    mapCodeforcesSubmissionHistory,
} = require("../../../mappers/submission.mapper");

const ApiError = require("../../../utils/ApiError");
const HTTP_STATUS = require("../../../constants/httpStatus");
const MESSAGES = require("../../../constants/messages");

const {
    calculateSubmissionStats,
} = require("../../analytics/submission.analytics");

const {
    calculateSubmissionActivity,
} = require("../../analytics/activity.analytics");

// =======================
// Profile
// =======================

const getCodeforcesProfile = async (handle) => {
    try {
        const response = await axios.get(
            `https://codeforces.com/api/user.info?handles=${handle}`
        );

        return mapCodeforcesProfile(response.data.result[0]);
    } catch (error) {
        throw new ApiError(
            HTTP_STATUS.BAD_REQUEST,
            MESSAGES.CP.INVALID_CODEFORCES_USERNAME
        );
    }
};

// =======================
// Contest History
// =======================

const getCodeforcesContestHistory = async (handle) => {
    try {
        const response = await axios.get(
            `https://codeforces.com/api/user.rating?handle=${handle}`
        );

        return mapCodeforcesContestHistory(response.data.result);
    } catch (error) {
        throw new ApiError(
            HTTP_STATUS.BAD_REQUEST,
            MESSAGES.CP.CONTEST_HISTORY_FETCH_FAILED
        );
    }
};

// =======================
// Submission History
// =======================

const getCodeforcesSubmissionHistory = async (handle) => {
    try {
        const response = await axios.get(
            `https://codeforces.com/api/user.status?handle=${handle}`
        );

        return mapCodeforcesSubmissionHistory(response.data.result);
    } catch (error) {
        throw new ApiError(
            HTTP_STATUS.BAD_REQUEST,
            MESSAGES.CP.SUBMISSION_HISTORY_FETCH_FAILED
        );
    }
};

// =======================
// Submission Analytics
// =======================

const getCodeforcesSubmissionStats = async (handle) => {
    const submissions = await getCodeforcesSubmissionHistory(handle);

    return calculateSubmissionStats(submissions);
};

const getCodeforcesSubmissionActivity = async (handle) => {
    const submissions = await getCodeforcesSubmissionHistory(handle);

    return calculateSubmissionActivity(submissions);
};

// =======================
// Dashboard
// =======================

const getCodeforcesDashboard = async (handle) => {
    const [
        profile,
        contests,
        submissions,
        submissionStats,
        activity,
    ] = await Promise.all([
        getCodeforcesProfile(handle),
        getCodeforcesContestHistory(handle),
        getCodeforcesSubmissionHistory(handle),
        getCodeforcesSubmissionStats(handle),
        getCodeforcesSubmissionActivity(handle),
    ]);

    return {
        profile,
        contests,
        submissionStats,
        activity,
        recentContests: contests.slice(0, 10),
        recentSubmissions: submissions.slice(0, 20),
    };
};

module.exports = {
    getCodeforcesProfile,
    getCodeforcesContestHistory,
    getCodeforcesSubmissionHistory,
    getCodeforcesSubmissionStats,
    getCodeforcesSubmissionActivity,
    getCodeforcesDashboard,
};