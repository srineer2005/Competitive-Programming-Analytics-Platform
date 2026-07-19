const mongoose = require("mongoose");

const contestSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        contestTitle: String,

        contestStartTime: Date,

        rating: Number,

        ranking: Number,

        problemsSolved: Number,

        totalProblems: Number,

        attended: Boolean,
    },
    {
        timestamps: true,
    }
);

contestSchema.index(
    {
        user: 1,
        contestTitle: 1,
    },
    {
        unique: true,
    }
);

module.exports = mongoose.model(
    "LeetCodeContest",
    contestSchema
);