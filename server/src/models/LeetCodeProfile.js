const mongoose = require("mongoose");

const leetCodeProfileSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            unique: true,
        },

        username: {
            type: String,
            required: true,
        },

        realName: String,

        avatar: String,

        ranking: Number,

        reputation: Number,

        starRating: Number,

        country: String,

        school: String,

        company: String,

        jobTitle: String,

        easySolved: {
            type: Number,
            default: 0,
        },

        mediumSolved: {
            type: Number,
            default: 0,
        },

        hardSolved: {
            type: Number,
            default: 0,
        },

        totalSolved: {
            type: Number,
            default: 0,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model(
    "LeetCodeProfile",
    leetCodeProfileSchema
);