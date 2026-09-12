const User = require("../models/User");
const Submission = require("../models/submission.model");
const LeetCodeProfile = require("../models/LeetCodeProfile");
const LeetCodeContest = require("../models/LeetCodeContest");
const ContestHistory = require("../models/ContestHistory");

const {
    getCodeforcesProfile,
} = require("./cp/codeforces/service");

const {
    syncContestHistory,
} = require("./cp/codeforces/sync");

const {
    syncSubmissionHistory,
} = require("./cp/codeforces/submission.sync");

const {
    syncLeetCode,
} = require("./cp/leetcode/sync");


// ==============================
// GET PROFILE
// ==============================

const getProfile = async (userId) => {
    const [
        user,
        leetcodeProfile,
        contestCount,
        latestContest,
        codeforcesSubmissions,
    ] = await Promise.all([
        User.findById(userId).select("-password"),

        LeetCodeProfile.findOne({
            user: userId,
        }),

        LeetCodeContest.countDocuments({
            user: userId,
        }),

        ContestHistory.findOne({
            user: userId,
            platform: "codeforces",
        }).sort({
            contestTime: -1,
        }),

        Submission.find({
            user: userId,
            platform: "codeforces",
            verdict: "OK",
        }).lean(),
    ]);

    if (!user) {
        throw new Error("User not found.");
    }


    // ------------------------------
    // Calculate unique CF problems
    // ------------------------------

    const solvedProblems = new Set();

    for (const submission of codeforcesSubmissions) {
        let problemKey = null;

        if (
            submission.contestId !== undefined &&
            submission.problemIndex
        ) {
            problemKey =
                `${submission.contestId}-${submission.problemIndex}`;
        } else if (submission.problemName) {
            problemKey = submission.problemName;
        }

        if (problemKey) {
            solvedProblems.add(problemKey);
        }
    }


    const codeforcesSolved = solvedProblems.size;

    const leetcodeSolved =
        leetcodeProfile?.totalSolved || 0;

    const codechefSolved = 0;


    const platformsConnected =
        (user.codeforces ? 1 : 0) +
        (user.leetcode ? 1 : 0) +
        (user.codechef ? 1 : 0);


    return {
        user: {
            id: user._id,
            name: user.name,
            email: user.email,

            country: user.country || "",
            state: user.state || "",
            university: user.university || "",

            codeforces: user.codeforces || "",
            leetcode: user.leetcode || "",
            codechef: user.codechef || "",
        },

        statistics: {
            platformsConnected,

            codeforces: {
                problemsSolved: codeforcesSolved,
            },

            leetcode: {
                problemsSolved: leetcodeSolved,
            },

            codechef: {
                problemsSolved: codechefSolved,
            },

            totalSolved:
                codeforcesSolved +
                leetcodeSolved +
                codechefSolved,

            totalContests: contestCount,

            currentCfRating:
                latestContest?.newRating || 0,
        },
    };
};


// ==============================
// UPDATE PROFILE
// ==============================

const updateProfile = async (userId, body) => {

    // --------------------------------
    // Validate Codeforces username
    // --------------------------------

    if (body.codeforces) {
        await getCodeforcesProfile(
            body.codeforces
        );
    }


    // --------------------------------
    // Save profile information
    // --------------------------------

    const updatedUser = await User.findByIdAndUpdate(
        userId,
        {
            $set: {
                name: body.name,
                country: body.country,
                state: body.state,
                university: body.university,

                codeforces: body.codeforces,
                leetcode: body.leetcode,
                codechef: body.codechef,
            },
        },
        {
            new: true,
            runValidators: true,
        }
    ).select("-password");


    if (!updatedUser) {
        throw new Error("User not found.");
    }


    // --------------------------------
    // Sync Codeforces
    // --------------------------------

    if (updatedUser.codeforces) {

        console.log(
            "Syncing Codeforces:",
            updatedUser.codeforces
        );

        await syncContestHistory(
            updatedUser._id,
            updatedUser.codeforces
        );

        await syncSubmissionHistory(
            updatedUser._id,
            updatedUser.codeforces
        );

        console.log(
            "Codeforces sync completed."
        );
    }


    // --------------------------------
    // Sync LeetCode
    // --------------------------------

    if (updatedUser.leetcode) {

        console.log(
            "Syncing LeetCode:",
            updatedUser.leetcode
        );

        await syncLeetCode(
            updatedUser
        );

        console.log(
            "LeetCode sync completed."
        );
    }


    return updatedUser;
};


module.exports = {
    getProfile,
    updateProfile,
};