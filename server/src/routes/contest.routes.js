const express = require("express");

const auth = require("../middleware/auth.middleware");

const {
    getContests,
} = require("../controllers/contest.controller");

const router = express.Router();

router.get("/", auth, getContests);

module.exports = router;