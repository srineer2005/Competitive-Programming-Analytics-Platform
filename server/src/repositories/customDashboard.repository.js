const CustomDashboard = require("../models/CustomDashboard");

const createDashboard = async (data) => {
    return await CustomDashboard.create(data);
};

const findDashboardById = async (id) => {
    return await CustomDashboard.findById(id)
        .populate("owner", "name username email")
        .populate("members", "name username email");
};

const findDashboardsForUser = async (userId) => {
    return await CustomDashboard.find({
        $or: [
            { owner: userId },
            { members: userId },
        ],
    })
        .populate("owner", "name username email")
        .populate("members", "name username email")
        .sort({ createdAt: -1 });
};

const findDiscoverableDashboards = async (userId) => {
    return await CustomDashboard.find({
        owner: { $ne: userId },
        members: { $ne: userId },
    })
        .select(
            "name description owner members createdAt"
        )
        .populate("owner", "name username")
        .sort({ createdAt: -1 });
};

const addMember = async (
    dashboardId,
    userId
) => {
    return await CustomDashboard.findByIdAndUpdate(
        dashboardId,
        {
            $addToSet: {
                members: userId,
            },
        },
        { new: true }
    )
        .populate("owner", "name username email")
        .populate("members", "name username email");
};

const removeMember = async (
    dashboardId,
    userId
) => {
    return await CustomDashboard.findByIdAndUpdate(
        dashboardId,
        {
            $pull: {
                members: userId,
            },
        },
        { new: true }
    )
        .populate("owner", "name username email")
        .populate("members", "name username email");
};

const deleteDashboard = async (id) => {
    return await CustomDashboard.findByIdAndDelete(id);
};

module.exports = {
    createDashboard,
    findDashboardById,
    findDashboardsForUser,
    findDiscoverableDashboards,
    addMember,
    removeMember,
    deleteDashboard,
};