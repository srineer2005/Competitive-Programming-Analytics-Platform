const notificationService = require(
    "../services/notification.service"
);

const getNotifications = async (
    req,
    res
) => {
    try {
        const notifications =
            await notificationService.getNotifications(
                req.user.id
            );

        return res.status(200).json({
            notifications,
        });
    } catch (error) {
        console.error(
            "Get Notifications Error:",
            error
        );

        return res.status(500).json({
            message:
                "Failed to fetch notifications.",
        });
    }
};

const getUnreadNotificationCount =
    async (
        req,
        res
    ) => {
        try {
            const count =
                await notificationService.getUnreadNotificationCount(
                    req.user.id
                );

            return res.status(200).json({
                count,
            });
        } catch (error) {
            console.error(
                "Get Notification Count Error:",
                error
            );

            return res.status(500).json({
                message:
                    "Failed to fetch notification count.",
            });
        }
    };

const markAsRead = async (
    req,
    res
) => {
    try {
        const notification =
            await notificationService.markAsRead(
                req.params.notificationId,
                req.user.id
            );

        if (!notification) {
            return res.status(404).json({
                message:
                    "Notification not found.",
            });
        }

        return res.status(200).json({
            message:
                "Notification marked as read.",
            notification,
        });
    } catch (error) {
        console.error(
            "Mark Notification Read Error:",
            error
        );

        return res.status(400).json({
            message: error.message,
        });
    }
};

const markAllAsRead = async (
    req,
    res
) => {
    try {
        await notificationService.markAllAsRead(
            req.user.id
        );

        return res.status(200).json({
            message:
                "All notifications marked as read.",
        });
    } catch (error) {
        console.error(
            "Mark All Notifications Read Error:",
            error
        );

        return res.status(500).json({
            message:
                "Failed to mark notifications as read.",
        });
    }
};

module.exports = {
    getNotifications,
    getUnreadNotificationCount,
    markAsRead,
    markAllAsRead,
};