const express = require("express");
const verifyJWT = require("../../middleware/auth.middleware");

const {
    getCodeforcesUser,
    getCodeforcesContests,
    getCodeforcesStats,
    getCodeforcesSubmissions,
    getCodeforcesSubmissionStatistics,
    getCodeforcesActivity,
    getCodeforcesDashboardData,
    syncCodeforcesData,
} = require("../../controllers/cp/codeforces.controller");

const router = express.Router();

router.get("/:handle/contests", getCodeforcesContests);

router.get("/:handle/stats", getCodeforcesStats);

router.get("/:handle/submissions", getCodeforcesSubmissions);

router.get(
    "/:handle/submission-stats",
    getCodeforcesSubmissionStatistics
);

router.get("/:handle/activity", getCodeforcesActivity);

router.get("/:handle/dashboard", getCodeforcesDashboardData);

router.post("/sync", verifyJWT, syncCodeforcesData);

router.get("/:handle", getCodeforcesUser);

module.exports = router;