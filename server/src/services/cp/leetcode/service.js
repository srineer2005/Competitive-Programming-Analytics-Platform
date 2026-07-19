const { graphqlRequest } = require("./api");
const { 
    USER_PROFILE_QUERY,
    USER_CONTEST_QUERY,
 } = require("./queries");
const getContestHistory = async (username) => {
    const data = await graphqlRequest(USER_CONTEST_QUERY, {
        username,
    });

    return {
        ranking: data.userContestRanking,
        history: data.userContestRankingHistory || [],
    };
};
const getDashboard = async (username) => {
    const [profile, contests] = await Promise.all([
        getLeetCodeProfile(username),
        getContestHistory(username),
    ]);

    return {
        profile,
        contestRanking: contests.ranking,
        contestHistory: contests.history,
    };
};

const getLeetCodeProfile = async (username) => {
    const data = await graphqlRequest(USER_PROFILE_QUERY, {
        username,
    });

    if (!data.matchedUser) {
        throw new Error("Invalid LeetCode username");
    }

    return data.matchedUser;
};

module.exports = {
    getLeetCodeProfile,
    getContestHistory,
    getDashboard,
};