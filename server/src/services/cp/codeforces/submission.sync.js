const { getCodeforcesSubmissionHistory } = require("./service");

const Submission = require("../../../models/submission.model");

const syncSubmissionHistory = async (userId, handle) => {
    console.log("CF Submission Sync: fetching submissions for", handle);

    const submissions = await getCodeforcesSubmissionHistory(handle);

    console.log(
        "CF Submission Sync: fetched",
        submissions.length,
        "submissions"
    );

    await Submission.deleteMany({
        user: userId,
        platform: "codeforces",
    });

    console.log("CF Submission Sync: old submissions deleted");

    const submissionsToSave = submissions.map((submission) => ({
        user: userId,
        platform: "codeforces",
        ...submission,
    }));

    if (submissionsToSave.length > 0) {
        await Submission.insertMany(submissionsToSave);

        console.log(
            "CF Submission Sync: saved",
            submissionsToSave.length,
            "submissions"
        );
    }

    return {
        totalFetched: submissions.length,
        newSubmissions: submissionsToSave.length,
    };
};

module.exports = {
    syncSubmissionHistory,
};