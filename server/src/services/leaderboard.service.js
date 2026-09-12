const User = require("../models/User");

const ContestHistory = require("../models/ContestHistory");
const Submission = require("../models/submission.model");

const LeetCodeProfile = require("../models/LeetCodeProfile");
const LeetCodeContest = require("../models/LeetCodeContest");

const getLeaderboard = async () => {
    const users = await User.find()
        .select("-password")
        .lean();

    const leaderboard = await Promise.all(
        users.map(async (user) => {
            const [
                latestCodeforcesContest,
                codeforcesSubmissions,
                leetcodeProfile,
                latestLeetCodeContest,
            ] = await Promise.all([
                ContestHistory.findOne({
                    user: user._id,
                    platform: "codeforces",
                })
                    .sort({ contestTime: -1 })
                    .lean(),

                Submission.find({
                    user: user._id,
                    platform: "codeforces",
                    verdict: "OK",
                })
                    .select(
                        "contestId problemIndex problemName"
                    )
                    .lean(),

                LeetCodeProfile.findOne({
                    user: user._id,
                }).lean(),

                LeetCodeContest.findOne({
                    user: user._id,
                })
                    .sort({ contestStartTime: -1 })
                    .lean(),
            ]);

            // =========================
            // Codeforces Problems Solved
            // =========================

            const solvedProblems = new Set();

            codeforcesSubmissions.forEach((submission) => {
                let problemKey = null;

                if (
                    submission.contestId !== undefined &&
                    submission.problemIndex
                ) {
                    problemKey = `${submission.contestId}-${submission.problemIndex}`;
                } else if (submission.problemName) {
                    problemKey = submission.problemName;
                }

                if (problemKey) {
                    solvedProblems.add(problemKey);
                }
            });

            const codeforcesProblemsSolved =
                solvedProblems.size;

            // =========================
            // Ratings
            // =========================

            const codeforcesRating =
                latestCodeforcesContest?.newRating ?? 0;

            const leetcodeRating =
                latestLeetCodeContest?.rating ?? 0;

            const leetcodeProblemsSolved =
                leetcodeProfile?.totalSolved ?? 0;

            return {
                userId: user._id,

                username: user.username,

                codeforcesRating,
                codeforcesProblemsSolved,

                leetcodeRating,
                leetcodeProblemsSolved,
            };
        })
    );

    // Rank primarily by Codeforces rating,
    // then by Codeforces solved,
    // then LeetCode rating,
    // then LeetCode solved.
    leaderboard.sort((a, b) => {
        if (b.codeforcesRating !== a.codeforcesRating) {
            return b.codeforcesRating - a.codeforcesRating;
        }

        if (
            b.codeforcesProblemsSolved !==
            a.codeforcesProblemsSolved
        ) {
            return (
                b.codeforcesProblemsSolved -
                a.codeforcesProblemsSolved
            );
        }

        if (b.leetcodeRating !== a.leetcodeRating) {
            return b.leetcodeRating - a.leetcodeRating;
        }

        return (
            b.leetcodeProblemsSolved -
            a.leetcodeProblemsSolved
        );
    });

    return leaderboard.map((user, index) => ({
        rank: index + 1,
        ...user,
    }));
};

module.exports = {
    getLeaderboard,
};