const HTTP_STATUS = require("../constants/httpStatus");
const ApiError = require("../utils/ApiError");

const validate = (schema) => {
    return (req, res, next) => {

    const { error } = schema.validate(req.body, {
        abortEarly: true,
        stripUnknown: true,
    });
        if (error) {
            return next(
                new ApiError(
                    HTTP_STATUS.BAD_REQUEST,
                    error.details[0].message
                )
            );
        }

        next();
    };
};

module.exports = validate;