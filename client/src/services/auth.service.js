import api from "../api/axios";

export const registerUser = async (userData) => {
    const response = await api.post("/auth/register", userData);
    return response.data;
};

export const loginUser = async (userData) => {
    const response = await api.post("/auth/login", userData);
    return response.data;
};

export const resendVerificationEmail = async (email) => {
    const response = await api.post(
        "/auth/resend-verification",
        { email }
    );

    return response.data;
};
export const googleVerifyUser = async (
    credential,
    expectedEmail
) => {
    const response = await api.post(
        "/auth/google",
        {
            credential,
            expectedEmail,
        }
    );

    return response.data;
};
export const forgotPassword = async (email) => {
    const response = await api.post(
        "/auth/forgot-password",
        { email }
    );

    return response.data;
};