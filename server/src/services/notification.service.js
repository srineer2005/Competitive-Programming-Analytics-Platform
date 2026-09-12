const notificationRepository = require(
    "../repositories/notification.repository"
);

const User = require("../models/User");

const createDashboardInvitationNotification =
    async (
        recipientId,
        senderId,
        dashboardId,
        invitationId,
        senderName,
        dashboardName
    ) => {
        return await notificationRepository.createNotification(
            {
                recipient: recipientId,
                sender: senderId,
                dashboard: dashboardId,
                invitation: invitationId,
                type: "DASHBOARD_INVITATION",
                message: `${senderName} invited you to join "${dashboardName}".`,
            }
        );
    };

const createJoinRequestNotification =
    async (
        ownerId,
        senderId,
        dashboardId,
        invitationId,
        senderName,
        dashboardName
    ) => {
        return await notificationRepository.createNotification(
            {
                recipient: ownerId,
                sender: senderId,
                dashboard: dashboardId,
                invitation: invitationId,
                type: "JOIN_REQUEST",
                message: `${senderName} requested to join "${dashboardName}".`,
            }
        );
    };

const createJoinRequestResponseNotification =
    async (
        recipientId,
        senderId,
        dashboardId,
        invitationId,
        approved,
        dashboardName
    ) => {
        return await notificationRepository.createNotification(
            {
                recipient: recipientId,
                sender: senderId,
                dashboard: dashboardId,
                invitation: invitationId,
                type: approved
                    ? "JOIN_REQUEST_ACCEPTED"
                    : "JOIN_REQUEST_REJECTED",
                message: approved
                    ? `Your request to join "${dashboardName}" was accepted.`
                    : `Your request to join "${dashboardName}" was rejected.`,
            }
        );
    };

/* ================= PROFILE COMPLETION ================= */

const isProfileIncomplete = (user) => {
    const requiredFields = [
        user.country,
        user.state,
        user.university,
        user.codeforces,
        user.leetcode,
        user.codechef,
    ];

    return requiredFields.some(
        (field) =>
            !field ||
            !field.toString().trim()
    );
};

const ensureProfileCompletionNotification =
    async (userId) => {
        const user = await User.findById(userId)
            .select(
                "country state university codeforces leetcode codechef"
            )
            .lean();

        if (!user) {
            return;
        }

        if (!isProfileIncomplete(user)) {
            return;
        }

        const existingNotification =
            await notificationRepository
                .findProfileCompletionNotification(
                    userId
                );

        if (existingNotification) {
            return;
        }

        await notificationRepository.createNotification(
            {
                recipient: userId,
                sender: null,
                dashboard: null,
                invitation: null,
                type: "PROFILE_INCOMPLETE",
                message:
                    "Complete your profile by adding your country, state, university and coding profiles.",
            }
        );
    };

const getNotifications = async (
    userId
) => {
    await ensureProfileCompletionNotification(
        userId
    );

    return await notificationRepository.findNotificationsForUser(
        userId
    );
};

const getUnreadNotificationCount =
    async (
        userId
    ) => {
        await ensureProfileCompletionNotification(
            userId
        );

        return await notificationRepository.getUnreadNotificationCount(
            userId
        );
    };

const markAsRead = async (
    notificationId,
    userId
) => {
    return await notificationRepository.markNotificationAsRead(
        notificationId,
        userId
    );
};

const markAllAsRead = async (
    userId
) => {
    return await notificationRepository.markAllNotificationsAsRead(
        userId
    );
};

module.exports = {
    createDashboardInvitationNotification,
    createJoinRequestNotification,
    createJoinRequestResponseNotification,
    getNotifications,
    getUnreadNotificationCount,
    markAsRead,
    markAllAsRead,
};