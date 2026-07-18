const Joi = require("joi");

const updateCodingProfilesSchema = Joi.object({
    codeforces: Joi.string()
        .trim()
        .allow("")
        .optional(),

    leetcode: Joi.string()
        .trim()
        .allow("")
        .optional(),

    codechef: Joi.string()
        .trim()
        .allow("")
        .optional(),
});

module.exports = {
    updateCodingProfilesSchema,
};