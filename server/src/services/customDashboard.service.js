const dashboardRepository = require("../repositories/customDashboard.repository");
const leaderboardService = require("./leaderboard.service");

const createDashboard = async (
    name,
    description,
    ownerId
) => {
    return await dashboardRepository.createDashboard({
        name,
        description,
        owner: ownerId,
        members: [],
    });
};

const getMyDashboards = async (userId) => {
    return await dashboardRepository.findDashboardsForUser(
        userId
    );
};

const getDiscoverableDashboards = async (userId) => {
    return await dashboardRepository.findDiscoverableDashboards(
        userId
    );
};

const getDashboardById = async (
    dashboardId,
    userId
) => {
    const dashboard =
        await dashboardRepository.findDashboardById(
            dashboardId
        );

    if (!dashboard) {
        throw new Error("Dashboard not found.");
    }

    const isOwner =
        dashboard.owner?._id.toString() ===
        userId.toString();

    const isMember = dashboard.members?.some(
        (member) =>
            member._id.toString() ===
            userId.toString()
    );

    if (!isOwner && !isMember) {
        throw new Error(
            "You are not a member of this dashboard."
        );
    }

    const leaderboard =
        await leaderboardService.getLeaderboard();

    const dashboardUserIds = new Set();

    dashboardUserIds.add(
        dashboard.owner._id.toString()
    );

    dashboard.members.forEach((member) => {
        dashboardUserIds.add(
            member._id.toString()
        );
    });

    const dashboardLeaderboard = leaderboard
        .filter((user) =>
            dashboardUserIds.has(
                user.userId.toString()
            )
        )
        .map((user, index) => ({
            ...user,
            rank: index + 1,
        }));

    return {
        ...dashboard.toObject(),
        leaderboard: dashboardLeaderboard,
        isOwner,
        isMember,
    };
};

const removeMember = async (
    dashboardId,
    ownerId,
    memberId
) => {
    const dashboard =
        await dashboardRepository.findDashboardById(
            dashboardId
        );

    if (!dashboard) {
        throw new Error("Dashboard not found.");
    }

    if (
        dashboard.owner?._id.toString() !==
        ownerId.toString()
    ) {
        throw new Error(
            "Only the dashboard owner can remove members."
        );
    }

    if (
        ownerId.toString() ===
        memberId.toString()
    ) {
        throw new Error(
            "The dashboard owner cannot be removed."
        );
    }

    const isMember = dashboard.members?.some(
        (member) =>
            member._id.toString() ===
            memberId.toString()
    );

    if (!isMember) {
        throw new Error(
            "This user is not a member of the dashboard."
        );
    }

    return await dashboardRepository.removeMember(
        dashboardId,
        memberId
    );
};

const leaveDashboard = async (
    dashboardId,
    userId
) => {
    const dashboard =
        await dashboardRepository.findDashboardById(
            dashboardId
        );

    if (!dashboard) {
        throw new Error("Dashboard not found.");
    }

    if (
        dashboard.owner?._id.toString() ===
        userId.toString()
    ) {
        throw new Error(
            "The dashboard owner cannot leave the dashboard."
        );
    }

    const isMember = dashboard.members?.some(
        (member) =>
            member._id.toString() ===
            userId.toString()
    );

    if (!isMember) {
        throw new Error(
            "You are not a member of this dashboard."
        );
    }

    return await dashboardRepository.removeMember(
        dashboardId,
        userId
    );
};

const deleteDashboard = async (
    dashboardId,
    userId
) => {
    const dashboard =
        await dashboardRepository.findDashboardById(
            dashboardId
        );

    if (!dashboard) {
        throw new Error("Dashboard not found.");
    }

    if (
        dashboard.owner?._id.toString() !==
        userId.toString()
    ) {
        throw new Error(
            "Only the dashboard owner can delete it."
        );
    }

    return await dashboardRepository.deleteDashboard(
        dashboardId
    );
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