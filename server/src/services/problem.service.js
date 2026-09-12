const Submission = require("../models/submission.model");

const getSolvedProblems = async (userId) => {
    // Fetch all submissions for the logged-in user
    const submissions = await Submission.find({
        user: userId,
    })
        .sort({ submittedAt: -1 })
        .lean();

    console.log("User submissions count:", submissions.length);

    if (submissions.length > 0) {
        console.log("First submission:", submissions[0]);
    }

    // Remove duplicate problems
    const uniqueProblems = [];
    const seen = new Set();

    for (const submission of submissions) {
        const key = `${submission.platform}-${submission.problemName}`;

        if (!seen.has(key)) {
            seen.add(key);
            uniqueProblems.push(submission);
        }
    }

    return uniqueProblems;
};

module.exports = {
    getSolvedProblems,
};