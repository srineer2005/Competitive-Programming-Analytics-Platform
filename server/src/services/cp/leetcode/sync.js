const {
    getLeetCodeProfile,
    getContestHistory,
} = require("./service");

const {
    saveProfile,
    saveContests,
} = require("../../../repositories/leetcode.repository");

const syncLeetCode = async (user) => {
    const username = user.leetcode;

    if (!username) {
        throw new Error("LeetCode username not found.");
    }

    const profile = await getLeetCodeProfile(username);
    const contests = await getContestHistory(username);

    const solved = profile.submitStats.acSubmissionNum;

    const easy =
        solved.find((x) => x.difficulty === "Easy")?.count || 0;

    const medium =
        solved.find((x) => x.difficulty === "Medium")?.count || 0;

    const hard =
        solved.find((x) => x.difficulty === "Hard")?.count || 0;

    const all =
        solved.find((x) => x.difficulty === "All")?.count || 0;

    await saveProfile({
        user: user._id,

        username,

        realName: profile.profile.realName,

        avatar: profile.profile.userAvatar,

        ranking: profile.profile.ranking,

        reputation: profile.profile.reputation,

        starRating: profile.profile.starRating,

        country: profile.profile.countryName,

        school: profile.profile.school,

        company: profile.profile.company,

        jobTitle: profile.profile.jobTitle,

        easySolved: easy,

        mediumSolved: medium,

        hardSolved: hard,

        totalSolved: all,
    });

    await saveContests(user._id, contests.history);

    return {
        success: true,
        totalContests: contests.history.length,
        totalSolved: all,
    };
};

module.exports = {
    syncLeetCode,
};