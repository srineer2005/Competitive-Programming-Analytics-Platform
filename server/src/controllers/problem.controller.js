const problemService = require("../services/problem.service");

const getSolvedProblems = async (req, res) => {
    try {
        console.log("Logged in user:", req.user);
        console.log("User ID:", req.user.id);

        const problems = await problemService.getSolvedProblems(req.user.id);

        console.log("Solved Problems:", problems);

        res.status(200).json(problems);
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to fetch solved problems.",
        });
    }
};

module.exports = {
    getSolvedProblems,
};