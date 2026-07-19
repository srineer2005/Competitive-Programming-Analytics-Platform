const mongoose = require("mongoose");

const submissionSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        platform: {
            type: String,
            required: true,
            enum: ["codeforces"],
        },

        submissionId: {
            type: Number,
            required: true,
        },

        contestId: Number,

        problemIndex: String,

        problemName: String,

        rating: Number,

        tags: {
            type: [String],
            default: [],
        },

        verdict: String,

        language: String,

        submittedAt: Date,
    },
    {
        timestamps: true,
    }
);

submissionSchema.index(
    {
        user: 1,
        platform: 1,
        submissionId: 1,
    },
    {
        unique: true,
    }
);

module.exports = mongoose.model(
    "Submission",
    submissionSchema
);