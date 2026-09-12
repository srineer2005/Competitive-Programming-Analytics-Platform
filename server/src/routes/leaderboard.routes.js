const express = require("express");
const leaderboardController = require("../controllers/leaderboard.controller");
const authMiddleware = require("../middleware/auth.middleware");

const router = express.Router();

router.use(authMiddleware);

router.get("/", leaderboardController.getLeaderboard);

module.exports = router;