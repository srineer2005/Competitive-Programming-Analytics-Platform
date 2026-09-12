const express = require("express");

const invitationController = require(
    "../controllers/dashboardInvitation.controller"
);

const authMiddleware = require(
    "../middleware/auth.middleware"
);

const router = express.Router();

router.use(authMiddleware);

router.post(
    "/send",
    invitationController.sendInvitation
);

router.post(
    "/request",
    invitationController.sendJoinRequest
);

router.get(
    "/received",
    invitationController.getMyInvitations
);

router.get(
    "/join-requests",
    invitationController.getMyJoinRequests
);

router.patch(
    "/:invitationId/accept",
    invitationController.acceptInvitation
);
router.patch(
    "/:invitationId/reject",
    invitationController.rejectInvitation
);

router.patch(
    "/:invitationId/respond",
    invitationController.respondToJoinRequest
);

module.exports = router;