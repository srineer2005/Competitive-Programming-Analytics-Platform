const axios = require("axios");
const { mapCodeforcesProfile } = require("../../mappers/codeforces.mapper");
const ApiError = require("../../utils/ApiError");
const HTTP_STATUS = require("../../constants/httpStatus");
const MESSAGES = require("../../constants/messages");
const {
    mapCodeforcesContestHistory,
} = require("../../mappers/contest.mapper");

const getCodeforcesProfile = async (handle) => {
    try {
        const response = await axios.get(
            `https://codeforces.com/api/user.info?handles=${handle}`
        );

        return mapCodeforcesProfile(response.data.result[0]);
    } catch (error) {
        throw new ApiError(
            HTTP_STATUS.BAD_REQUEST,
            MESSAGES.CP.INVALID_CODEFORCES_USERNAME
        );
    }
};

const getCodeforcesContestHistory = async (handle) => {
    try {
        const response = await axios.get(
            `https://codeforces.com/api/user.rating?handle=${handle}`
        );

        return mapCodeforcesContestHistory(response.data.result);
    } catch (error) {
        throw new ApiError(
            HTTP_STATUS.BAD_REQUEST,
            MESSAGES.CP.CONTEST_HISTORY_FETCH_FAILED
        );
    }
};

module.exports = {
    getCodeforcesProfile,
    getCodeforcesContestHistory,
};