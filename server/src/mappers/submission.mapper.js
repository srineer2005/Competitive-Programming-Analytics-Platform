const mapCodeforcesSubmission = (submission) => {
    return {
        submissionId: submission.id,
        contestId: submission.problem.contestId,
        problemIndex: submission.problem.index,
        problemName: submission.problem.name,
        rating: submission.problem.rating || null,
        tags: submission.problem.tags || [],
        verdict: submission.verdict,
        language: submission.programmingLanguage,
        submittedAt: new Date(submission.creationTimeSeconds * 1000),
    };
};

const mapCodeforcesSubmissionHistory = (submissions) => {
    return submissions.map(mapCodeforcesSubmission);
};

module.exports = {
    mapCodeforcesSubmission,
    mapCodeforcesSubmissionHistory,
};