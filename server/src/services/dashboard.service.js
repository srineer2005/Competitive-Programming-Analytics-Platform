const User = require("../models/User");

const LeetCodeProfile = require("../models/LeetCodeProfile");
const LeetCodeContest = require("../models/LeetCodeContest");

const ContestHistory = require("../models/ContestHistory");

const getDashboard = async (userId) => {
    const [
        user,
        leetcodeProfile,
        leetcodeContests,
        codeforcesContests,
    ] = await Promise.all([
        User.findById(userId).select("-password"),

        LeetCodeProfile.findOne({
            user: userId,
        }),

        LeetCodeContest.find({
            user: userId,
        }).sort({
            contestStartTime: -1,
        }),

        ContestHistory.find({
            user: userId,
            platform: "codeforces",
        }).sort({
            contestTime: -1,
        }),
    ]);

    const highestCodeforcesRating =
    codeforcesContests.length > 0
        ? Math.max(...codeforcesContests.map(c => c.newRating))
        : 0;

const currentCodeforcesRating =
    codeforcesContests.length > 0
        ? codeforcesContests[0].newRating
        : 0;

const averageRatingChange =
    codeforcesContests.length > 0
        ? (
              codeforcesContests.reduce(
                  (sum, contest) => sum + contest.ratingChange,
                  0
              ) / codeforcesContests.length
          ).toFixed(2)
        : 0;

const bestContestRank =
    codeforcesContests.length > 0
        ? Math.min(...codeforcesContests.map(c => c.rank))
        : 0;

const worstContestRank =
    codeforcesContests.length > 0
        ? Math.max(...codeforcesContests.map(c => c.rank))
        : 0;

const positiveContests = codeforcesContests.filter(
    contest => contest.ratingChange > 0
).length;

const negativeContests = codeforcesContests.filter(
    contest => contest.ratingChange < 0
).length;

    return {
    user: {
        name: user.name,
        email: user.email,
    },

    summary: {
    platformsConnected:
        (user.codeforces ? 1 : 0) +
        (user.leetcode ? 1 : 0) +
        (user.codechef ? 1 : 0),

    totalCodeforcesContests: codeforcesContests.length,

    totalLeetCodeContests: leetcodeContests.length,

    totalSolved: leetcodeProfile?.totalSolved || 0,

    currentCodeforcesRating,

    highestCodeforcesRating,

    averageRatingChange,

    bestContestRank,

    worstContestRank,

    positiveContests,

    negativeContests,
},

    codeforces: {
        handle: user.codeforces,

        recentContests: codeforcesContests.slice(0, 5),
    },

    leetcode: {
        handle: user.leetcode,

        profile: leetcodeProfile,

        recentContests: leetcodeContests.slice(0, 5),
    },
};
};

module.exports = {
    getDashboard,
};