const LeetCodeProfile = require("../models/LeetCodeProfile");
const LeetCodeContest = require("../models/LeetCodeContest");

const saveProfile = async (profile) => {
    return LeetCodeProfile.findOneAndUpdate(
        {
            user: profile.user,
        },
        profile,
        {
            upsert: true,
            new: true,
        }
    );
};

const saveContests = async (userId, contests) => {
    await LeetCodeContest.deleteMany({
        user: userId,
    });

    if (contests.length === 0) {
        return;
    }

    const docs = contests.map((contest) => ({
        user: userId,
        contestTitle: contest.contest.title,
        contestStartTime: new Date(
            contest.contest.startTime * 1000
        ),
        rating: contest.rating,
        ranking: contest.ranking,
        problemsSolved: contest.problemsSolved,
        totalProblems: contest.totalProblems,
        attended: contest.attended,
    }));

    return LeetCodeContest.insertMany(docs);
};

module.exports = {
    saveProfile,
    saveContests,
};