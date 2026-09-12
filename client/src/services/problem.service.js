import api from "../api/axios";

export const getSolvedProblems = async () => {
    const response = await api.get("/problems");
    return response.data;
};