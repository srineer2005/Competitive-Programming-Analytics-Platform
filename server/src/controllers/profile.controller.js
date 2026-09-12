const profileService = require("../services/profile.service");

const getProfile = async (req, res) => {
    try {
        const profile = await profileService.getProfile(
            req.user.id
        );

        res.status(200).json({
            success: true,
            statusCode: 200,
            message: "Profile fetched successfully.",
            data: profile,
        });
    } catch (error) {
        console.error(
            "GET PROFILE ERROR:",
            error
        );

        res.status(500).json({
            success: false,
            statusCode: 500,
            message: error.message || "Failed to fetch profile.",
        });
    }
};

const updateProfile = async (req, res) => {
    try {
        const profile =
            await profileService.updateProfile(
                req.user.id,
                req.body
            );

        res.status(200).json({
            success: true,
            statusCode: 200,
            message: "Profile updated successfully.",
            data: profile,
        });
    } catch (error) {
        console.error(
            "UPDATE PROFILE ERROR:",
            error
        );

        res.status(500).json({
            success: false,
            statusCode: 500,
            message: error.message || "Failed to update profile.",
        });
    }
};

module.exports = {
    getProfile,
    updateProfile,
};