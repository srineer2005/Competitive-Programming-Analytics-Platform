const express = require("express");

const {
    getCodeforcesUser,
    getCodeforcesContests,
    getCodeforcesStats,
} = require("../controllers/cp.controller");

const router = express.Router();
router.get("/codeforces/:handle/contests", getCodeforcesContests);
router.get("/codeforces/:handle/stats", getCodeforcesStats);
router.get("/codeforces/:handle", getCodeforcesUser);

module.exports = router;