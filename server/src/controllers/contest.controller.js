const contestService = require("../services/contest.service");

const getContests = async (req, res, next) => {
    try {
        const contests = await contestService.getContests();

        res.status(200).json(contests);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getContests,
};