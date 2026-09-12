const express = require("express");

const router = express.Router();

const problemController = require("../controllers/problem.controller");
const authMiddleware = require("../middleware/auth.middleware");

router.get(
    "/",
    authMiddleware,
    problemController.getSolvedProblems
);

module.exports = router;