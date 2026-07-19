const calculateCodeforcesStats = (contests) => {
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
        const change = contest.ratingChange;

        totalRatingChange += change;

        if (contest.newRating > highestRating) {
            highestRating = contest.newRating;
        }

        if (contest.oldRating < lowestRating) {
            lowestRating = contest.oldRating;
        }

        if (change > bestContest.ratingChange) {
            bestContest = contest;
        }

        if (change < worstContest.ratingChange) {
            worstContest = contest;
        }

        if (change > 0) {
            positiveChanges++;
        } else if (change < 0) {
            negativeChanges++;
        } else {
            noChange++;
        }
    }

    return {
        totalContests: contests.length,
        highestRating,
        lowestRating,
        currentRating: contests[contests.length - 1].newRating,
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
    calculateCodeforcesStats,
};