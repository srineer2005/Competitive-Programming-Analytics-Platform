const DashboardInvitation = require(
    "../models/DashboardInvitation"
);

const createInvitation = async (
    invitationData
) => {
    return await DashboardInvitation.create(
        invitationData
    );
};

const findPendingInvitation = async (
    dashboardId,
    senderId,
    recipientId,
    type
) => {
    return await DashboardInvitation.findOne({
        dashboard: dashboardId,
        sender: senderId,
        recipient: recipientId,
        type,
        status: "PENDING",
    });
};

const findInvitationById = async (
    invitationId
) => {
    return await DashboardInvitation.findById(
        invitationId
    )
        .populate(
            "dashboard",
            "name description owner members"
        )
        .populate(
            "sender",
            "name email"
        )
        .populate(
            "recipient",
            "name email"
        );
};

const findReceivedInvitations = async (
    userId
) => {
    return await DashboardInvitation.find({
        recipient: userId,
        type: "INVITATION",
        status: "PENDING",
    })
        .populate(
            "dashboard",
            "name description owner members"
        )
        .populate(
            "sender",
            "name email"
        )
        .sort({
            createdAt: -1,
        });
};

const findReceivedJoinRequests = async (
    userId
) => {
    return await DashboardInvitation.find({
        recipient: userId,
        type: "JOIN_REQUEST",
        status: "PENDING",
    })
        .populate(
            "dashboard",
            "name description owner members"
        )
        .populate(
            "sender",
            "name email"
        )
        .sort({
            createdAt: -1,
        });
};

const updateInvitationStatus = async (
    invitationId,
    status
) => {
    return await DashboardInvitation.findByIdAndUpdate(
        invitationId,
        {
            status,
        },
        {
            new: true,
        }
    )
        .populate(
            "dashboard",
            "name description owner members"
        )
        .populate(
            "sender",
            "name email"
        )
        .populate(
            "recipient",
            "name email"
        );
};

const findSentInvitations = async (
    userId
) => {
    return await DashboardInvitation.find({
        sender: userId,
        type: "INVITATION",
    })
        .populate(
            "dashboard",
            "name description owner members"
        )
        .populate(
            "recipient",
            "name email"
        )
        .sort({
            createdAt: -1,
        });
};

module.exports = {
    createInvitation,
    findPendingInvitation,
    findInvitationById,
    findReceivedInvitations,
    findReceivedJoinRequests,
    updateInvitationStatus,
    findSentInvitations,
};