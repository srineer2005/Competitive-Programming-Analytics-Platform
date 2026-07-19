const { getCodeforcesContestHistory } = require("./service");

const {
    createMany,
    findByUser,
} = require("../../../repositories/contest.repository");

/**
 * Sync Codeforces contest history for a user.
 *
 * If contests are already stored, return them.
 * Otherwise fetch from Codeforces, save to MongoDB,
 * and return the saved contests.
 */
const syncContestHistory = async (userId, handle) => {
    // Check if contests already exist
    const existingContests = await findByUser(
        userId,
        "codeforces"
    );

    if (existingContests.length > 0) {
        return {
            source: "database",
            totalContests: existingContests.length,
            contests: existingContests,
        };
    }

    // Fetch from Codeforces
    const contests = await getCodeforcesContestHistory(handle);

    // Prepare documents
    const contestsToSave = contests.map((contest) => ({
        user: userId,
        platform: "codeforces",
        ...contest,
    }));

    // Save to MongoDB
    await createMany(contestsToSave);

    return {
        source: "codeforces",
        totalContests: contestsToSave.length,
        contests: contestsToSave,
    };
};

module.exports = {
    syncContestHistory,
};