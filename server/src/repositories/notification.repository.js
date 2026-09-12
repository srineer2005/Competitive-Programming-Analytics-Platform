const Notification = require(
    "../models/Notification"
);

const createNotification = async (
    notificationData
) => {
    return await Notification.create(
        notificationData
    );
};

const findNotificationByInvitation = async (
    invitationId
) => {
    return await Notification.findOne({
        invitation: invitationId,
    });
};

const findProfileCompletionNotification = async (
    userId
) => {
    return await Notification.findOne({
        recipient: userId,
        type: "PROFILE_INCOMPLETE",
    });
};

const findNotificationsForUser = async (
    userId
) => {
    return await Notification.find({
        recipient: userId,
    })
        .populate(
            "sender",
            "name username email"
        )
        .populate(
            "dashboard",
            "name description"
        )
        .populate(
            "invitation"
        )
        .sort({
            createdAt: -1,
        });
};

const findUnreadNotificationsForUser =
    async (
        userId
    ) => {
        return await Notification.find({
            recipient: userId,
            isRead: false,
        })
            .populate(
                "sender",
                "name username email"
            )
            .populate(
                "dashboard",
                "name description"
            )
            .populate(
                "invitation"
            )
            .sort({
                createdAt: -1,
            });
    };

const getUnreadNotificationCount =
    async (
        userId
    ) => {
        return await Notification.countDocuments({
            recipient: userId,
            isRead: false,
        });
    };

const markNotificationAsRead =
    async (
        notificationId,
        userId
    ) => {
        return await Notification.findOneAndUpdate(
            {
                _id: notificationId,
                recipient: userId,
            },
            {
                isRead: true,
            },
            {
                new: true,
            }
        );
    };

const markAllNotificationsAsRead =
    async (
        userId
    ) => {
        return await Notification.updateMany(
            {
                recipient: userId,
                isRead: false,
            },
            {
                isRead: true,
            }
        );
    };

module.exports = {
    createNotification,
    findNotificationByInvitation,
    findProfileCompletionNotification,
    findNotificationsForUser,
    findUnreadNotificationsForUser,
    getUnreadNotificationCount,
    markNotificationAsRead,
    markAllNotificationsAsRead,
};