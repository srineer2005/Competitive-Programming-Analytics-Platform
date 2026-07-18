const express = require("express");

const {
    register,
    login,
    me,
} = require("../controllers/auth.controller");

const auth = require("../middleware/auth.middleware");
const validate = require("../middleware/validate.middleware");

const {
    registerSchema,
    loginSchema,
} = require("../validators/auth.validator");

const router = express.Router();

router.get("/me", auth, me);

router.post(
    "/register",
    validate(registerSchema),
    register
);

router.post(
    "/login",
    validate(loginSchema),
    login
);

module.exports = router;