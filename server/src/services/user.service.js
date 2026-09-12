const {
    updateCodingProfiles,
    getCodingProfiles,
} = require("../repositories/user.repository");

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

const updateUserCodingProfiles = async (userId, profileData) => {
    // Validate Codeforces handle first
    if (profileData.codeforces) {
        await getCodeforcesProfile(profileData.codeforces);
    }

    // Save the handles to THIS application user
    const updatedUser = await updateCodingProfiles(
        userId,
        profileData
    );

    console.log(
        "Coding profiles updated for user:",
        updatedUser._id.toString()
    );

    // -------------------------
    // Codeforces synchronization
    // -------------------------

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
            "Codeforces sync completed for:",
            updatedUser.codeforces
        );
    }

    // -------------------------
    // LeetCode synchronization
    // -------------------------

    if (updatedUser.leetcode) {
        console.log(
            "Syncing LeetCode:",
            updatedUser.leetcode
        );

        await syncLeetCode(updatedUser);

        console.log(
            "LeetCode sync completed for:",
            updatedUser.leetcode
        );
    }

    return updatedUser;
};

const getUserCodingProfiles = async (userId) => {
    return await getCodingProfiles(userId);
};

module.exports = {
    updateUserCodingProfiles,
    getUserCodingProfiles,
};