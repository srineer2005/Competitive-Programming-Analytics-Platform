const ContestHistory = require("../models/ContestHistory");

const createMany = async (contests) => {
    return ContestHistory.insertMany(contests);
};

const findByUser = async (userId) => {
    return ContestHistory.find({
        user: userId,
        platform: "codeforces",
    }).sort({
        contestTime: 1,
    });
};

module.exports = {
    createMany,
    findByUser,
};