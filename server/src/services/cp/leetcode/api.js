const axios = require("axios");

const LEETCODE_API = "https://leetcode.com/graphql";

const graphqlRequest = async (query, variables = {}) => {
    const response = await axios.post(
        LEETCODE_API,
        {
            query,
            variables,
        },
        {
            headers: {
                "Content-Type": "application/json",
            },
        }
    );

    if (response.data.errors) {
        throw new Error(response.data.errors[0].message);
    }

    return response.data.data;
};

module.exports = {
    graphqlRequest,
};