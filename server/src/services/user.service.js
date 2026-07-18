const { updateCodingProfiles } = require("../repositories/user.repository");
const { getCodeforcesProfile } = require("./cp/codeforces.service");

const updateUserCodingProfiles = async (userId, profileData) => {

    // Validate Codeforces username if provided
    if (profileData.codeforces) {
        await getCodeforcesProfile(profileData.codeforces);
    }

    return await updateCodingProfiles(userId, profileData);
};

module.exports = {
    updateUserCodingProfiles,
};