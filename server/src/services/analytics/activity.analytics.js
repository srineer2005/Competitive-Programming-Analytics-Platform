const calculateSubmissionActivity = (submissions) => {
    const activity = {};

    for (const submission of submissions) {
        const date = submission.submittedAt
            .toISOString()
            .split("T")[0];

        activity[date] = (activity[date] || 0) + 1;
    }

    return activity;
};

module.exports = {
    calculateSubmissionActivity,
};