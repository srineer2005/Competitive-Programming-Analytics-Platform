const express = require("express");

const {
    register,
    verify,
    resendVerification,
    forgot,
    reset,
    login,
    me,
    googleVerify,
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

router.get(
    "/verify-email",
    verify
);

router.post(
    "/resend-verification",
    resendVerification
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
    "/login",
    validate(loginSchema),
    login
);
router.post(
    "/google",
    googleVerify
);

module.exports = router;