const calculateSubmissionStats = (submissions) => {
    const stats = {
        totalSubmissions: submissions.length,
        accepted: 0,
        acceptanceRate: 0,
        languages: {},
        verdicts: {},
        difficulty: {},
        tags: {},
    };
    const solvedProblems = new Set();
    for (const submission of submissions) {
        // Accepted count
        if (submission.verdict === "OK") {
            const key = `${submission.contestId}-${submission.problemIndex}`;

            if (!solvedProblems.has(key)) {
                solvedProblems.add(key);
                stats.accepted++;
            }
        }

        // Languages
        stats.languages[submission.language] =
            (stats.languages[submission.language] || 0) + 1;

        // Verdicts
        stats.verdicts[submission.verdict] =
            (stats.verdicts[submission.verdict] || 0) + 1;

        // Difficulty
        if (submission.rating) {
            stats.difficulty[submission.rating] =
                (stats.difficulty[submission.rating] || 0) + 1;
        }

        // Tags
        for (const tag of submission.tags) {
            stats.tags[tag] =
                (stats.tags[tag] || 0) + 1;
        }
    }
    stats.totalSolved = solvedProblems.size;

    stats.acceptanceRate =
    stats.totalSubmissions === 0
        ? 0
        : Number(
              (
                  (stats.totalSolved / stats.totalSubmissions) *
                  100
              ).toFixed(2)
          );

    return stats;
};

module.exports = {
    calculateSubmissionStats,
};
