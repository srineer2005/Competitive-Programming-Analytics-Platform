const express = require("express");

const auth = require("../middleware/auth.middleware");
const validate = require("../middleware/validate.middleware");

const {
    updateCodingProfiles,
} = require("../controllers/user.controller");

const {
    updateCodingProfilesSchema,
} = require("../validators/user.validator");

const router = express.Router();

router.put(
    "/coding-profiles",
    auth,
    validate(updateCodingProfilesSchema),
    updateCodingProfiles
);

module.exports = router;