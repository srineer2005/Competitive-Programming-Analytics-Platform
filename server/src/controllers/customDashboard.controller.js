const dashboardService = require("../services/customDashboard.service");

const createDashboard = async (req, res) => {
    try {
        const { name, description } = req.body;

        if (!name || !name.trim()) {
            return res.status(400).json({
                success: false,
                message: "Dashboard name is required.",
            });
        }

        const dashboard =
            await dashboardService.createDashboard(
                name.trim(),
                description?.trim() || "",
                req.user.id
            );

        res.status(201).json({
            success: true,
            dashboard,
        });
    } catch (error) {
        console.error(
            "Create Dashboard Error:",
            error
        );

        res.status(500).json({
            success: false,
            message:
                error.message ||
                "Unable to create dashboard.",
        });
    }
};

const getMyDashboards = async (req, res) => {
    try {
        const dashboards =
            await dashboardService.getMyDashboards(
                req.user.id
            );

        res.status(200).json({
            success: true,
            dashboards,
        });
    } catch (error) {
        console.error(
            "Get My Dashboards Error:",
            error
        );

        res.status(500).json({
            success: false,
            message:
                error.message ||
                "Unable to load dashboards.",
        });
    }
};

const getDiscoverableDashboards = async (
    req,
    res
) => {
    try {
        const dashboards =
            await dashboardService.getDiscoverableDashboards(
                req.user.id
            );

        res.status(200).json({
            success: true,
            dashboards,
        });
    } catch (error) {
        console.error(
            "Get Discoverable Dashboards Error:",
            error
        );

        res.status(500).json({
            success: false,
            message:
                error.message ||
                "Unable to load available dashboards.",
        });
    }
};

const getDashboardById = async (req, res) => {
    try {
        const dashboard =
            await dashboardService.getDashboardById(
                req.params.dashboardId,
                req.user.id
            );

        res.status(200).json({
            success: true,
            dashboard,
        });
    } catch (error) {
        console.error(
            "Get Dashboard Error:",
            error
        );

        const statusCode =
            error.message ===
            "You are not a member of this dashboard."
                ? 403
                : 500;

        res.status(statusCode).json({
            success: false,
            message:
                error.message ||
                "Unable to load dashboard.",
        });
    }
};

const removeMember = async (req, res) => {
    try {
        const { memberId } = req.body;

        if (!memberId) {
            return res.status(400).json({
                success: false,
                message: "Member ID is required.",
            });
        }

        const dashboard =
            await dashboardService.removeMember(
                req.params.dashboardId,
                req.user.id,
                memberId
            );

        res.status(200).json({
            success: true,
            message: "Member removed successfully.",
            dashboard,
        });
    } catch (error) {
        console.error(
            "Remove Member Error:",
            error
        );

        const statusCode =
            error.message.includes("Only the dashboard owner") ||
            error.message.includes("cannot be removed")
                ? 403
                : 400;

        res.status(statusCode).json({
            success: false,
            message:
                error.message ||
                "Unable to remove member.",
        });
    }
};

const leaveDashboard = async (req, res) => {
    try {
        const dashboard =
            await dashboardService.leaveDashboard(
                req.params.dashboardId,
                req.user.id
            );

        res.status(200).json({
            success: true,
            message: "You left the dashboard successfully.",
            dashboard,
        });
    } catch (error) {
        console.error(
            "Leave Dashboard Error:",
            error
        );

        const statusCode =
            error.message.includes("owner cannot leave")
                ? 403
                : 400;

        res.status(statusCode).json({
            success: false,
            message:
                error.message ||
                "Unable to leave dashboard.",
        });
    }
};

const deleteDashboard = async (req, res) => {
    try {
        await dashboardService.deleteDashboard(
            req.params.dashboardId,
            req.user.id
        );

        res.status(200).json({
            success: true,
            message: "Dashboard deleted successfully.",
        });
    } catch (error) {
        console.error(
            "Delete Dashboard Error:",
            error
        );

        const statusCode =
            error.message.includes("Only the dashboard owner")
                ? 403
                : 400;

        res.status(statusCode).json({
            success: false,
            message:
                error.message ||
                "Unable to delete dashboard.",
        });
    }
};

module.exports = {
    createDashboard,
    getMyDashboards,
    getDiscoverableDashboards,
    getDashboardById,
    removeMember,
    leaveDashboard,
    deleteDashboard,
};