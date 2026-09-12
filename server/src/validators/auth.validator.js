const Joi = require("joi");

const registerSchema = Joi.object({
    name: Joi.string()
        .trim()
        .min(3)
        .max(50)
        .required()
        .messages({
            "string.empty": "Name is required",
            "string.min":
                "Name must be at least 3 characters",
            "string.max":
                "Name cannot exceed 50 characters",
            "any.required": "Name is required",
        }),

    username: Joi.string()
        .trim()
        .lowercase()
        .min(3)
        .max(20)
        .pattern(/^[a-z0-9_]+$/)
        .required()
        .messages({
            "string.empty": "Username is required",
            "string.min":
                "Username must be at least 3 characters",
            "string.max":
                "Username cannot exceed 20 characters",
            "string.pattern.base":
                "Username can contain only letters, numbers and underscores",
            "any.required": "Username is required",
        }),

    email: Joi.string()
        .trim()
        .email()
        .required()
        .messages({
            "string.empty": "Email is required",
            "string.email":
                "Please enter a valid email",
            "any.required": "Email is required",
        }),

    password: Joi.string()
        .min(6)
        .required()
        .messages({
            "string.empty": "Password is required",
            "string.min":
                "Password must be at least 6 characters",
            "any.required": "Password is required",
        }),
});

const loginSchema = Joi.object({
    email: Joi.string()
        .trim()
        .email()
        .required()
        .messages({
            "string.empty": "Email is required",
            "string.email":
                "Please enter a valid email",
            "any.required": "Email is required",
        }),

    password: Joi.string()
        .required()
        .messages({
            "string.empty": "Password is required",
            "any.required": "Password is required",
        }),
});

module.exports = {
    registerSchema,
    loginSchema,
};