const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema(
    {
        recipient: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        sender: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            default: null,
        },

        dashboard: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "CustomDashboard",
            default: null,
        },

        invitation: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "DashboardInvitation",
            default: null,
        },

        type: {
            type: String,
            enum: [
                "DASHBOARD_INVITATION",
                "JOIN_REQUEST",
                "JOIN_REQUEST_ACCEPTED",
                "JOIN_REQUEST_REJECTED",
                "PROFILE_INCOMPLETE",
            ],
            required: true,
        },

        message: {
            type: String,
            required: true,
            trim: true,
            maxlength: 300,
        },

        isRead: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

notificationSchema.index({
    recipient: 1,
    isRead: 1,
    createdAt: -1,
});

notificationSchema.index({
    recipient: 1,
    createdAt: -1,
});

module.exports = mongoose.model(
    "Notification",
    notificationSchema
);