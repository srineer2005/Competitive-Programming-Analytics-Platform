const express = require("express");
const auth = require("../../middleware/auth.middleware");
const {
    getProfile,
    getContests,
    getDashboardData,
    sync,
} = require("../../controllers/cp/leetcode.controller");

const router = express.Router();

router.get("/:username", getProfile);
router.get("/:username/contests", getContests);
router.get("/:username/dashboard", getDashboardData);
router.post("/sync", auth, sync);

module.exports = router;