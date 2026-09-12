const dashboardRepository = require(
    "../repositories/customDashboard.repository"
);

const invitationRepository = require(
    "../repositories/dashboardInvitation.repository"
);

const userRepository = require(
    "../repositories/user.repository"
);

const notificationRepository = require(
    "../repositories/notification.repository"
);

const notificationService = require(
    "./notification.service"
);

const ensureInvitationNotification = async (
    invitation,
    dashboard
) => {
    const existingNotification =
        await notificationRepository.findNotificationByInvitation(
            invitation._id
        );

    if (existingNotification) {
        return existingNotification;
    }

    if (invitation.type === "INVITATION") {
        return await notificationService.createDashboardInvitationNotification(
            invitation.recipient._id ||
                invitation.recipient,
            invitation.sender._id ||
                invitation.sender,
            dashboard._id,
            invitation._id,
            dashboard.owner.name,
            dashboard.name
        );
    }

    if (invitation.type === "JOIN_REQUEST") {
        const sender =
            await userRepository.findUserById(
                invitation.sender._id ||
                    invitation.sender
            );

        return await notificationService.createJoinRequestNotification(
            dashboard.owner._id,
            invitation.sender._id ||
                invitation.sender,
            dashboard._id,
            invitation._id,
            sender?.name || "A user",
            dashboard.name
        );
    }

    return null;
};

const createInvitation = async (
    dashboardId,
    senderId,
    recipientEmail
) => {
    const dashboard =
        await dashboardRepository.findDashboardById(
            dashboardId
        );

    if (!dashboard) {
        throw new Error(
            "Dashboard not found."
        );
    }

    if (
        dashboard.owner._id.toString() !==
        senderId.toString()
    ) {
        throw new Error(
            "Only the dashboard owner can invite members."
        );
    }

    const recipient =
        await userRepository.findUserByEmail(
            recipientEmail
        );

    if (!recipient) {
        throw new Error(
            "No registered user found with this email."
        );
    }

    if (
        recipient._id.toString() ===
        senderId.toString()
    ) {
        throw new Error(
            "You cannot invite yourself."
        );
    }

    const alreadyMember =
        dashboard.members.some(
            (member) =>
                member._id.toString() ===
                recipient._id.toString()
        );

    if (alreadyMember) {
        throw new Error(
            "This user is already a member of the dashboard."
        );
    }

    const existingInvitation =
        await invitationRepository.findPendingInvitation(
            dashboardId,
            senderId,
            recipient._id,
            "INVITATION"
        );

    if (existingInvitation) {
        await ensureInvitationNotification(
            existingInvitation,
            dashboard
        );

        throw new Error(
            "An invitation is already pending for this user."
        );
    }

    const invitation =
        await invitationRepository.createInvitation(
            {
                dashboard: dashboardId,
                sender: senderId,
                recipient: recipient._id,
                type: "INVITATION",
            }
        );

    await notificationService.createDashboardInvitationNotification(
        recipient._id,
        senderId,
        dashboard._id,
        invitation._id,
        dashboard.owner.name,
        dashboard.name
    );

    return invitation;
};

const createJoinRequest = async (
    dashboardId,
    userId
) => {
    const dashboard =
        await dashboardRepository.findDashboardById(
            dashboardId
        );

    if (!dashboard) {
        throw new Error(
            "Dashboard not found."
        );
    }

    if (
        dashboard.owner._id.toString() ===
        userId.toString()
    ) {
        throw new Error(
            "You already own this dashboard."
        );
    }

    const alreadyMember =
        dashboard.members.some(
            (member) =>
                member._id.toString() ===
                userId.toString()
        );

    if (alreadyMember) {
        throw new Error(
            "You are already a member of this dashboard."
        );
    }

    const existingRequest =
        await invitationRepository.findPendingInvitation(
            dashboardId,
            userId,
            dashboard.owner._id,
            "JOIN_REQUEST"
        );

    if (existingRequest) {
        await ensureInvitationNotification(
            existingRequest,
            dashboard
        );

        throw new Error(
            "A join request is already pending."
        );
    }

    const request =
        await invitationRepository.createInvitation(
            {
                dashboard: dashboardId,
                sender: userId,
                recipient:
                    dashboard.owner._id,
                type: "JOIN_REQUEST",
            }
        );

    const sender =
        await userRepository.findUserById(
            userId
        );

    await notificationService.createJoinRequestNotification(
        dashboard.owner._id,
        userId,
        dashboard._id,
        request._id,
        sender?.name || "A user",
        dashboard.name
    );

    return request;
};

const acceptInvitation = async (
    invitationId,
    userId
) => {
    const invitation =
        await invitationRepository.findInvitationById(
            invitationId
        );

    if (!invitation) {
        throw new Error(
            "Invitation not found."
        );
    }

    if (
        invitation.recipient._id.toString() !==
        userId.toString()
    ) {
        throw new Error(
            "You are not allowed to accept this invitation."
        );
    }

    if (
        invitation.type !==
        "INVITATION"
    ) {
        throw new Error(
            "This is not a dashboard invitation."
        );
    }

    if (invitation.status !== "PENDING") {
        throw new Error(
            "This invitation is no longer pending."
        );
    }

    const dashboard =
        await dashboardRepository.findDashboardById(
            invitation.dashboard._id
        );

    if (!dashboard) {
        throw new Error(
            "Dashboard no longer exists."
        );
    }

    const alreadyMember =
        dashboard.members.some(
            (member) =>
                member._id.toString() ===
                userId.toString()
        );

    if (!alreadyMember) {
        await dashboardRepository.addMember(
            dashboard._id,
            userId
        );
    }

    return await invitationRepository.updateInvitationStatus(
        invitationId,
        "ACCEPTED"
    );
};

const respondToJoinRequest = async (
    invitationId,
    ownerId,
    approved
) => {
    const invitation =
        await invitationRepository.findInvitationById(
            invitationId
        );

    if (!invitation) {
        throw new Error(
            "Join request not found."
        );
    }

    if (
        invitation.type !==
        "JOIN_REQUEST"
    ) {
        throw new Error(
            "This is not a join request."
        );
    }

    if (
        invitation.recipient._id.toString() !==
        ownerId.toString()
    ) {
        throw new Error(
            "Only the dashboard owner can respond to this request."
        );
    }

    if (invitation.status !== "PENDING") {
        throw new Error(
            "This request is no longer pending."
        );
    }

    const dashboard =
        await dashboardRepository.findDashboardById(
            invitation.dashboard._id
        );

    if (!dashboard) {
        throw new Error(
            "Dashboard no longer exists."
        );
    }

    if (approved) {
        const alreadyMember =
            dashboard.members.some(
                (member) =>
                    member._id.toString() ===
                    invitation.sender._id.toString()
            );

        if (!alreadyMember) {
            await dashboardRepository.addMember(
                dashboard._id,
                invitation.sender._id
            );
        }
    }

    const updatedInvitation =
        await invitationRepository.updateInvitationStatus(
            invitationId,
            approved
                ? "ACCEPTED"
                : "REJECTED"
        );

    await notificationService.createJoinRequestResponseNotification(
        invitation.sender._id,
        ownerId,
        dashboard._id,
        invitation._id,
        approved,
        dashboard.name
    );

    return updatedInvitation;
};

const getReceivedInvitations = async (
    userId
) => {
    return await invitationRepository.findReceivedInvitations(
        userId
    );
};

const getReceivedJoinRequests = async (
    userId
) => {
    return await invitationRepository.findReceivedJoinRequests(
        userId
    );
};

const rejectInvitation = async (
    invitationId,
    userId
) => {
    const invitation =
        await invitationRepository.findInvitationById(
            invitationId
        );

    if (!invitation) {
        throw new Error(
            "Invitation not found."
        );
    }

    if (
        invitation.recipient._id.toString() !==
        userId.toString()
    ) {
        throw new Error(
            "You are not allowed to reject this invitation."
        );
    }

    if (
        invitation.type !==
        "INVITATION"
    ) {
        throw new Error(
            "This is not a dashboard invitation."
        );
    }

    if (invitation.status !== "PENDING") {
        throw new Error(
            "This invitation is no longer pending."
        );
    }

    return await invitationRepository.updateInvitationStatus(
        invitationId,
        "REJECTED"
    );
};

module.exports = {
    createInvitation,
    createJoinRequest,
    acceptInvitation,
    rejectInvitation,
    respondToJoinRequest,
    getReceivedInvitations,
    getReceivedJoinRequests,
};