const mongoose = require("mongoose");

const customDashboardSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
            maxlength: 100,
        },

        description: {
            type: String,
            trim: true,
            maxlength: 300,
            default: "",
        },

        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        members: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
        ],
    },
    {
        timestamps: true,
    }
);

customDashboardSchema.index({
    owner: 1,
});

customDashboardSchema.index({
    members: 1,
});

module.exports = mongoose.model(
    "CustomDashboard",
    customDashboardSchema
);