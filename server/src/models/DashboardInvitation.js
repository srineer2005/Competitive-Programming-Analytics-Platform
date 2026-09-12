const mongoose = require("mongoose");

const dashboardInvitationSchema = new mongoose.Schema(
    {
        dashboard: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "CustomDashboard",
            required: true,
        },

        sender: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        recipient: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        type: {
            type: String,
            enum: [
                "INVITATION",
                "JOIN_REQUEST",
            ],
            required: true,
        },

        status: {
            type: String,
            enum: [
                "PENDING",
                "ACCEPTED",
                "REJECTED",
            ],
            default: "PENDING",
        },
    },
    {
        timestamps: true,
    }
);

dashboardInvitationSchema.index({
    dashboard: 1,
    sender: 1,
    recipient: 1,
    type: 1,
    status: 1,
});

module.exports = mongoose.model(
    "DashboardInvitation",
    dashboardInvitationSchema
);