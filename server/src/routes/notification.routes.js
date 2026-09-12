const express = require("express");

const notificationController = require(
    "../controllers/notification.controller"
);

const authMiddleware = require(
    "../middleware/auth.middleware"
);

const router = express.Router();

router.use(authMiddleware);

router.get(
    "/",
    notificationController.getNotifications
);

router.get(
    "/unread-count",
    notificationController.getUnreadNotificationCount
);

router.patch(
    "/read-all",
    notificationController.markAllAsRead
);

router.patch(
    "/:notificationId/read",
    notificationController.markAsRead
);

module.exports = router;