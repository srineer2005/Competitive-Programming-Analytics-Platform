const { getCodeforcesContestHistory } = require("./service");

const {
    createMany,
    findByUser,
} = require("../../../repositories/contest.repository");

const ContestHistory = require("../../../models/ContestHistory");

const syncContestHistory = async (userId, handle) => {
    console.log("CF Contest Sync: fetching contests for", handle);

    const contests = await getCodeforcesContestHistory(handle);

    console.log(
        "CF Contest Sync: fetched",
        contests.length,
        "contests"
    );

    const existingContests = await findByUser(userId);

    console.log(
        "CF Contest Sync: existing contests",
        existingContests.length
    );

    if (existingContests.length > 0) {
        await ContestHistory.deleteMany({
            user: userId,
            platform: "codeforces",
        });

        console.log("CF Contest Sync: old contests deleted");
    }

    const contestsToSave = contests.map((contest) => ({
        user: userId,
        platform: "codeforces",
        ...contest,
    }));

    if (contestsToSave.length > 0) {
        await createMany(contestsToSave);

        console.log(
            "CF Contest Sync: saved",
            contestsToSave.length,
            "contests"
        );
    }

    return {
        source: "codeforces",
        totalContests: contestsToSave.length,
    };
};

module.exports = {
    syncContestHistory,
};