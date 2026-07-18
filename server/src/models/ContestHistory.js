const mongoose = require("mongoose");

const contestHistorySchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        platform: {
            type: String,
            required: true,
            enum: ["codeforces", "leetcode", "codechef"],
        },

        contestId: {
            type: Number,
            required: true,
        },

        contestName: {
            type: String,
            required: true,
        },

        rank: {
            type: Number,
            required: true,
        },

        oldRating: {
            type: Number,
            required: true,
        },

        newRating: {
            type: Number,
            required: true,
        },

        ratingChange: {
            type: Number,
            required: true,
        },

        contestTime: {
            type: Date,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);
contestHistorySchema.index(
    {
        user: 1,
        platform: 1,
        contestId: 1,
    },
    {
        unique: true,
    }
);

module.exports = mongoose.model(
    "ContestHistory",
    contestHistorySchema
);