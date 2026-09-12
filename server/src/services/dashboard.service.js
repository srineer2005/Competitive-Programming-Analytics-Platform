const User = require("../models/User");
const LeetCodeProfile = require("../models/LeetCodeProfile");
const LeetCodeContest = require("../models/LeetCodeContest");
const ContestHistory = require("../models/ContestHistory");
const Submission = require("../models/submission.model");

const getDashboard = async (userId) => {
    const [
        user,
        leetcodeProfile,
        leetcodeContestStats,
        leetcodeContests,
        codeforcesStats,
        codeforcesCurrentContest,
        codeforcesRecentContests,
        codeforcesSolvedSubmissions,
    ] = await Promise.all([
        User.findById(userId)
    .select("name username email codeforces leetcode codechef")
    .lean(),

        LeetCodeProfile.findOne({ user: userId }).lean(),

        LeetCodeContest.aggregate([
            {
                $match: {
                    user: userId,
                },
            },
            {
                $group: {
                    _id: null,
                    totalContests: {
                        $sum: 1,
                    },
                    highestRating: {
                        $max: "$rating",
                    },
                },
            },
        ]),

        // Full LeetCode contest history
        LeetCodeContest.find({
            user: userId,
        })
            .sort({
                contestStartTime: 1,
            })
            .lean(),

        ContestHistory.aggregate([
            {
                $match: {
                    user: userId,
                    platform: "codeforces",
                },
            },
            {
                $group: {
                    _id: null,
                    totalContests: {
                        $sum: 1,
                    },
                    highestRating: {
                        $max: "$newRating",
                    },
                    averageRatingChange: {
                        $avg: "$ratingChange",
                    },
                    bestContestRank: {
                        $min: "$rank",
                    },
                    worstContestRank: {
                        $max: "$rank",
                    },
                    positiveContests: {
                        $sum: {
                            $cond: [
                                {
                                    $gt: [
                                        "$ratingChange",
                                        0,
                                    ],
                                },
                                1,
                                0,
                            ],
                        },
                    },
                    negativeContests: {
                        $sum: {
                            $cond: [
                                {
                                    $lt: [
                                        "$ratingChange",
                                        0,
                                    ],
                                },
                                1,
                                0,
                            ],
                        },
                    },
                },
            },
        ]),

        ContestHistory.findOne({
            user: userId,
            platform: "codeforces",
        })
            .sort({
                contestTime: -1,
            })
            .select("newRating")
            .lean(),

        ContestHistory.find({
    user: userId,
    platform: "codeforces",
})
    .sort({
        contestTime: 1,
    })
    .lean(),

        // Unique Codeforces problems solved
        Submission.find({
            user: userId,
            platform: "codeforces",
            verdict: "OK",
        })
            .select("contestId problemIndex")
            .lean(),
    ]);

    /* ================= CODEFORCES ================= */

    const cfStats = codeforcesStats[0] || {};

    const currentCodeforcesRating =
        codeforcesCurrentContest?.newRating || 0;

    const highestCodeforcesRating =
        cfStats.highestRating || 0;

    const averageRatingChange =
        cfStats.averageRatingChange !== undefined
            ? cfStats.averageRatingChange.toFixed(2)
            : "0.00";

    const bestContestRank =
        cfStats.bestContestRank || 0;

    const worstContestRank =
        cfStats.worstContestRank || 0;

    const positiveContests =
        cfStats.positiveContests || 0;

    const negativeContests =
        cfStats.negativeContests || 0;

    const totalCodeforcesContests =
        cfStats.totalContests || 0;

    // Count unique Codeforces problems
    const solvedCodeforcesProblems = new Set();

    codeforcesSolvedSubmissions.forEach((submission) => {
        solvedCodeforcesProblems.add(
            `${submission.contestId}-${submission.problemIndex}`
        );
    });

    const codeforcesProblemsSolved =
        solvedCodeforcesProblems.size;

    /* ================= LEETCODE ================= */

    const totalLeetCodeContests =
        leetcodeContestStats[0]?.totalContests || 0;

    const highestLeetCodeRating =
        leetcodeContestStats[0]?.highestRating || 0;

    // The last contest in ascending order is the current/latest rating
    const latestLeetCodeContest =
        leetcodeContests.length > 0
            ? leetcodeContests[
                  leetcodeContests.length - 1
              ]
            : null;

    const currentLeetCodeRating =
        latestLeetCodeContest?.rating || 0;

    const leetcodeProblemsSolved =
        leetcodeProfile?.totalSolved || 0;

    // Latest 5 LeetCode contests for the recent-contests table
    const recentLeetCodeContests =
        [...leetcodeContests]
            .sort(
                (a, b) =>
                    new Date(b.contestStartTime) -
                    new Date(a.contestStartTime)
            )
            .slice(0, 5);

    return {
        user: {
    username: user?.username || "",
    email: user?.email || "",
},

        summary: {
            /* ================= GENERAL ================= */

            platformsConnected:
                (user?.codeforces ? 1 : 0) +
                (user?.leetcode ? 1 : 0) +
                (user?.codechef ? 1 : 0),

            totalSolved:
                codeforcesProblemsSolved +
                leetcodeProblemsSolved,

            /* ================= CODEFORCES ================= */

            currentCodeforcesRating,

            highestCodeforcesRating,

            codeforcesProblemsSolved,

            totalCodeforcesContests,

            averageRatingChange,

            bestContestRank,

            worstContestRank,

            positiveContests,

            negativeContests,

            /* ================= LEETCODE ================= */

            currentLeetCodeRating,

            highestLeetCodeRating,

            leetcodeProblemsSolved,

            leetcodeEasySolved:
                leetcodeProfile?.easySolved || 0,

            leetcodeMediumSolved:
                leetcodeProfile?.mediumSolved || 0,

            leetcodeHardSolved:
                leetcodeProfile?.hardSolved || 0,

            totalLeetCodeContests,
        },

        codeforces: {
    handle: user?.codeforces || "",
    contests: codeforcesRecentContests,
    recentContests: [...codeforcesRecentContests]
        .sort(
            (a, b) =>
                new Date(b.contestTime) -
                new Date(a.contestTime)
        )
        .slice(0, 3),
},

        leetcode: {
            handle: user?.leetcode || "",
            profile: leetcodeProfile,

            // Full history → rating graph
            contests: leetcodeContests,

            // Latest 5 → recent contests table
            recentContests: recentLeetCodeContests,
        },
    };
};

module.exports = {
    getDashboard,
};