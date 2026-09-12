const express = require("express");

const dashboardController = require("../controllers/customDashboard.controller");
const authMiddleware = require("../middleware/auth.middleware");

const router = express.Router();

router.use(authMiddleware);

router.post(
    "/",
    dashboardController.createDashboard
);

router.get(
    "/",
    dashboardController.getMyDashboards
);

// Must stay before /:dashboardId
router.get(
    "/discover",
    dashboardController.getDiscoverableDashboards
);

router.get(
    "/:dashboardId",
    dashboardController.getDashboardById
);

router.delete(
    "/:dashboardId/member",
    dashboardController.removeMember
);

// Member leaves dashboard
router.delete(
    "/:dashboardId/leave",
    dashboardController.leaveDashboard
);

router.delete(
    "/:dashboardId",
    dashboardController.deleteDashboard
);

module.exports = router;