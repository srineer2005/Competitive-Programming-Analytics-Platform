const ContestHistory = require("../models/ContestHistory");

const createMany = async (contests) => {
    return ContestHistory.insertMany(contests);
};

const findByUser = async (userId, platform) => {
    return ContestHistory.find({
        user: userId,
        platform,
    }).sort({
        contestTime: 1,
    });
};

module.exports = {
    createMany,
    findByUser,
};