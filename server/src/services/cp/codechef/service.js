const api = require("./api");

const getCodeChefProfile = async (username) => {
    return new Promise((resolve, reject) => {
        api.fetchUser(username, (err, data) => {
            if (err) {
                return reject(err);
            }

            if (!data || data.success === false) {
                return reject(new Error("Invalid CodeChef username"));
            }

            resolve(data);
        });
    });
};

module.exports = {
    getCodeChefProfile,
};