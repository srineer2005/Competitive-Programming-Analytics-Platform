const { getCodeforcesSubmissionHistory } = require("./service");

const {
    createMany,
    findLatestSubmission,
} = require("../../../repositories/submission.repository");

const syncSubmissionHistory = async (userId, handle) => {
    const submissions = await getCodeforcesSubmissionHistory(handle);

    const latestSubmission = await findLatestSubmission(userId);

    let newSubmissions = submissions;

    if (latestSubmission) {
        newSubmissions = submissions.filter(
            (submission) =>
                submission.submissionId > latestSubmission.submissionId
        );
    }

    const submissionsToSave = newSubmissions.map((submission) => ({
        user: userId,
        platform: "codeforces",
        ...submission,
    }));

    if (submissionsToSave.length > 0) {
        await createMany(submissionsToSave);
    }

    return {
        totalFetched: submissions.length,
        newSubmissions: submissionsToSave.length,
    };
};

module.exports = {
    syncSubmissionHistory,
};