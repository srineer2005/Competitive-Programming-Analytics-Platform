import api from "../api/axios";

export const getCodingProfiles = async () => {
    const response = await api.get("/users/coding-profiles");
    return response.data;
};

export const updateCodingProfiles = async (profileData) => {
    const response = await api.put(
        "/users/coding-profiles",
        profileData
    );

    return response.data;
};