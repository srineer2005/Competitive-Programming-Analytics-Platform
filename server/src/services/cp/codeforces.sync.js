const { getCodeforcesContestHistory } = require("./codeforces.service");
const {
    createMany,
    findByUser,
} = require("../../repositories/contest.repository");

const syncContestHistory = async (userId, handle) => {
    const existing = await findByUser(userId, "codeforces");

    if (existing.length > 0) {
        return existing;
    }

    const contests = await getCodeforcesContestHistory(handle);

    const contestsToSave = contests.map((contest) => ({
        user: userId,
        platform: "codeforces",
        ...contest,
    }));

    await createMany(contestsToSave);

    return contestsToSave;
};

module.exports = {
    syncContestHistory,
};