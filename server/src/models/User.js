const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },

        username: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            minlength: 3,
            maxlength: 20,
            match: /^[a-zA-Z0-9_]+$/,
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },

        password: {
            type: String,
            required: true,
            minlength: 6,
        },

        isEmailVerified: {
            type: Boolean,
            default: false,
        },

        emailVerificationToken: {
            type: String,
            default: "",
        },

        emailVerificationExpires: {
            type: Date,
            default: null,
        },

        passwordResetToken: {
            type: String,
            default: "",
        },

        passwordResetExpires: {
            type: Date,
            default: null,
        },

        country: {
            type: String,
            trim: true,
            default: "",
        },

        state: {
            type: String,
            trim: true,
            default: "",
        },

        university: {
            type: String,
            trim: true,
            default: "",
        },

        codeforces: {
            type: String,
            trim: true,
            default: "",
        },

        leetcode: {
            type: String,
            trim: true,
            default: "",
        },

        codechef: {
            type: String,
            trim: true,
            default: "",
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("User", userSchema);