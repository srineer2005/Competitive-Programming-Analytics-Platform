const Submission = require("../models/submission.model");

const createMany = async (submissions) => {
    return Submission.insertMany(submissions, {
        ordered: false,
    });
};

const findByUser = async (userId) => {
    return Submission.find({ user: userId })
        .sort({ submittedAt: -1 })
        .lean();
};

const findLatestSubmission = async (userId) => {
    return Submission.findOne({ user: userId })
        .sort({ submissionId: -1 })
        .lean();
};

const bulkUpsert = async (operations) => {
    return Submission.bulkWrite(operations);
};

module.exports = {
    createMany,
    findByUser,
    findLatestSubmission,
    bulkUpsert,
};