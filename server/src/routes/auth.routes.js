const express = require("express");

const {
    register,
    forgot,
    reset,
    login,
    me,
    googleVerify,
    googlePasswordResetController,
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
    "/forgot-password",
    forgot
);

router.post(
    "/reset-password",
    reset
);
router.post(
    "/google-password-reset",
    googlePasswordResetController
);

router.post(
    "/login",
    validate(loginSchema),
    login
);
router.post(
    "/google",
    googleVerify
);

module.exports = router;