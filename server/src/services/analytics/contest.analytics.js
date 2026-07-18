const calculateContestStats = (contests) => {
    if (!contests.length) {
        return {
            totalContests: 0,
            highestRating: 0,
            lowestRating: 0,
            currentRating: 0,
            averageRatingChange: 0,
            bestContest: null,
            worstContest: null,
            positiveChanges: 0,
            negativeChanges: 0,
            noChange: 0,
        };
    }

    let highestRating = contests[0].newRating;
    let lowestRating = contests[0].oldRating;

    let totalRatingChange = 0;

    let bestContest = contests[0];
    let worstContest = contests[0];

    let positiveChanges = 0;
    let negativeChanges = 0;
    let noChange = 0;

    for (const contest of contests) {
        totalRatingChange += contest.ratingChange;

        highestRating = Math.max(highestRating, contest.newRating);
        lowestRating = Math.min(lowestRating, contest.oldRating);

        if (contest.ratingChange > bestContest.ratingChange) {
            bestContest = contest;
        }

        if (contest.ratingChange < worstContest.ratingChange) {
            worstContest = contest;
        }

        if (contest.ratingChange > 0) {
            positiveChanges++;
        } else if (contest.ratingChange < 0) {
            negativeChanges++;
        } else {
            noChange++;
        }
    }

    return {
        totalContests: contests.length,
        highestRating,
        lowestRating,
        currentRating: contests.at(-1).newRating,
        averageRatingChange: Number(
            (totalRatingChange / contests.length).toFixed(2)
        ),
        bestContest: {
            contestName: bestContest.contestName,
            ratingChange: bestContest.ratingChange,
        },
        worstContest: {
            contestName: worstContest.contestName,
            ratingChange: worstContest.ratingChange,
        },
        positiveChanges,
        negativeChanges,
        noChange,
    };
};

module.exports = {
    calculateContestStats,
};