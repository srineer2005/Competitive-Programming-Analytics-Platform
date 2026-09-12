const invitationService = require(
    "../services/dashboardInvitation.service"
);

const sendInvitation = async (
    req,
    res
) => {
    try {
        const {
            dashboardId,
            recipientEmail,
        } = req.body;

        if (
            !dashboardId ||
            !recipientEmail
        ) {
            return res.status(400).json({
                message:
                    "Dashboard ID and recipient email are required.",
            });
        }

        const invitation =
            await invitationService.createInvitation(
                dashboardId,
                req.user.id,
                recipientEmail
            );

        return res.status(201).json({
            message:
                "Dashboard invitation sent successfully.",
            invitation,
        });
    } catch (error) {
        console.error(
            "Send Invitation Error:",
            error
        );

        return res.status(400).json({
            message: error.message,
        });
    }
};

const sendJoinRequest = async (
    req,
    res
) => {
    try {
        const {
            dashboardId,
        } = req.body;

        if (!dashboardId) {
            return res.status(400).json({
                message:
                    "Dashboard ID is required.",
            });
        }

        const request =
            await invitationService.createJoinRequest(
                dashboardId,
                req.user.id
            );

        return res.status(201).json({
            message:
                "Join request sent successfully.",
            request,
        });
    } catch (error) {
        console.error(
            "Join Request Error:",
            error
        );

        return res.status(400).json({
            message: error.message,
        });
    }
};

const acceptInvitation = async (
    req,
    res
) => {
    try {
        const invitation =
            await invitationService.acceptInvitation(
                req.params.invitationId,
                req.user.id
            );

        return res.status(200).json({
            message:
                "Invitation accepted successfully.",
            invitation,
        });
    } catch (error) {
        console.error(
            "Accept Invitation Error:",
            error
        );

        return res.status(400).json({
            message: error.message,
        });
    }
};

const respondToJoinRequest = async (
    req,
    res
) => {
    try {
        const {
            approved,
        } = req.body;

        if (
            typeof approved !==
            "boolean"
        ) {
            return res.status(400).json({
                message:
                    "Approved must be true or false.",
            });
        }

        const request =
            await invitationService.respondToJoinRequest(
                req.params.invitationId,
                req.user.id,
                approved
            );

        return res.status(200).json({
            message: approved
                ? "Join request approved successfully."
                : "Join request rejected successfully.",
            request,
        });
    } catch (error) {
        console.error(
            "Respond Join Request Error:",
            error
        );

        return res.status(400).json({
            message: error.message,
        });
    }
};

const getMyInvitations = async (
    req,
    res
) => {
    try {
        const invitations =
            await invitationService.getReceivedInvitations(
                req.user.id
            );

        return res.status(200).json({
            invitations,
        });
    } catch (error) {
        console.error(
            "Get Invitations Error:",
            error
        );

        return res.status(500).json({
            message:
                "Failed to fetch invitations.",
        });
    }
};

const getMyJoinRequests = async (
    req,
    res
) => {
    try {
        const requests =
            await invitationService.getReceivedJoinRequests(
                req.user.id
            );

        return res.status(200).json({
            requests,
        });
    } catch (error) {
        console.error(
            "Get Join Requests Error:",
            error
        );

        return res.status(500).json({
            message:
                "Failed to fetch join requests.",
        });
    }
};
const rejectInvitation = async (
    req,
    res
) => {
    try {
        const invitation =
            await invitationService.rejectInvitation(
                req.params.invitationId,
                req.user.id
            );

        return res.status(200).json({
            message:
                "Invitation rejected successfully.",
            invitation,
        });
    } catch (error) {
        console.error(
            "Reject Invitation Error:",
            error
        );

        return res.status(400).json({
            message: error.message,
        });
    }
};

module.exports = {
    sendInvitation,
    sendJoinRequest,
    acceptInvitation,
    respondToJoinRequest,
    getMyInvitations,
    getMyJoinRequests,
};

module.exports = {
    sendInvitation,
    sendJoinRequest,
    acceptInvitation,
    rejectInvitation,
    respondToJoinRequest,
    getMyInvitations,
    getMyJoinRequests,
};