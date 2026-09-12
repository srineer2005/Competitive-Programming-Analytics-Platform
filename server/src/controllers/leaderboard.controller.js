const leaderboardService = require("../services/leaderboard.service");

const getLeaderboard = async (req, res) => {
    try {
        const leaderboard =
            await leaderboardService.getLeaderboard();

        res.status(200).json({
            success: true,
            data: leaderboard,
        });
    } catch (error) {
        console.error(
            "Leaderboard Controller Error:",
            error
        );

        res.status(500).json({
            success: false,
            message: "Failed to load leaderboard.",
        });
    }
};

module.exports = {
    getLeaderboard,
};