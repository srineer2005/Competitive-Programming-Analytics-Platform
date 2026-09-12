import api from "../api/axios";

export const getPerformance = async () => {
    const response = await api.get("/dashboard");
    return response.data;
};