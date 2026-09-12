import api from "../api/axios";

export const sendDashboardInvitation =
    async (
        dashboardId,
        recipientEmail
    ) => {
        const response = await api.post(
            "/dashboard-invitations/send",
            {
                dashboardId,
                recipientEmail,
            }
        );

        return response.data;
    };

export const sendJoinRequest = async (
    dashboardId
) => {
    const response = await api.post(
        "/dashboard-invitations/request",
        {
            dashboardId,
        }
    );

    return response.data;
};

export const getReceivedInvitations =
    async () => {
        const response = await api.get(
            "/dashboard-invitations/received"
        );

        return response.data;
    };

export const getReceivedJoinRequests =
    async () => {
        const response = await api.get(
            "/dashboard-invitations/join-requests"
        );

        return response.data;
    };

export const acceptDashboardInvitation =
    async (
        invitationId
    ) => {
        const response = await api.patch(
            `/dashboard-invitations/${invitationId}/accept`
        );

        return response.data;
    };

export const respondToJoinRequest =
    async (
        invitationId,
        approved
    ) => {
        const response = await api.patch(
            `/dashboard-invitations/${invitationId}/respond`,
            {
                approved,
            }
        );

        return response.data;
    };
export const rejectDashboardInvitation =
    async (
        invitationId
    ) => {
        const response = await api.patch(
            `/dashboard-invitations/${invitationId}/reject`
        );

        return response.data;
    };