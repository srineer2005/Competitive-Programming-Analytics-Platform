import api from "../api/axios";

export const getContests = async () => {
    const response = await api.get("/contests");
    return response.data;
};