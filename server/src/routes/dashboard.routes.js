const express = require("express");

const auth = require("../middleware/auth.middleware");

const {
    dashboard,
} = require("../controllers/dashboard.controller");

const router = express.Router();

router.get("/", auth, dashboard);

module.exports = router;