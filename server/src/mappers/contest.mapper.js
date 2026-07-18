const mapCodeforcesContest = (contest) => {
    return {
        contestId: contest.contestId,
        contestName: contest.contestName,
        rank: contest.rank,
        oldRating: contest.oldRating,
        newRating: contest.newRating,
        ratingChange: contest.newRating - contest.oldRating,
        contestTime: new Date(
            contest.ratingUpdateTimeSeconds * 1000
        ),
    };
};

const mapCodeforcesContestHistory = (contests) => {
    return contests.map(mapCodeforcesContest);
};

module.exports = {
    mapCodeforcesContest,
    mapCodeforcesContestHistory,
};