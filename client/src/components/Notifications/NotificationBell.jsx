import { useEffect, useRef, useState } from "react";

import {
    getNotifications,
    getUnreadNotificationCount,
    markNotificationAsRead,
    markAllNotificationsAsRead,
} from "../../services/notification.service";

import {
    acceptDashboardInvitation,
    rejectDashboardInvitation,
    respondToJoinRequest,
} from "../../services/dashboardInvitation.service";

import "./NotificationBell.css";

function NotificationBell() {
    const [unreadCount, setUnreadCount] =
        useState(0);

    const [notifications, setNotifications] =
        useState([]);

    const [isOpen, setIsOpen] =
        useState(false);

    const [loading, setLoading] =
        useState(false);

    const [actionLoading, setActionLoading] =
        useState("");

    const [error, setError] =
        useState("");

    const bellRef = useRef(null);

    const loadUnreadCount = async () => {
        try {
            const data =
                await getUnreadNotificationCount();

            setUnreadCount(data.count || 0);
        } catch (error) {
            console.error(
                "Notification Count Error:",
                error
            );
        }
    };

    const loadNotifications = async () => {
        try {
            setLoading(true);
            setError("");

            const data =
                await getNotifications();

            setNotifications(
                data.notifications || []
            );
        } catch (error) {
            console.error(
                "Notifications Error:",
                error
            );

            setError(
                error.response?.data?.message ||
                    "Unable to load notifications."
            );
        } finally {
            setLoading(false);
        }
    };

    const refreshNotifications = async () => {
        await Promise.all([
            loadNotifications(),
            loadUnreadCount(),
        ]);
    };

    useEffect(() => {
        loadUnreadCount();

        const interval = setInterval(
            loadUnreadCount,
            30000
        );

        return () =>
            clearInterval(interval);
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                bellRef.current &&
                !bellRef.current.contains(
                    event.target
                )
            ) {
                setIsOpen(false);
            }
        };

        document.addEventListener(
            "mousedown",
            handleClickOutside
        );

        return () =>
            document.removeEventListener(
                "mousedown",
                handleClickOutside
            );
    }, []);

    const handleToggle = async () => {
        const nextState = !isOpen;

        setIsOpen(nextState);

        if (nextState) {
            await loadNotifications();
            await loadUnreadCount();
        }
    };

    const handleMarkAsRead = async (
        notification
    ) => {
        if (notification.isRead) {
            return;
        }

        try {
            await markNotificationAsRead(
                notification._id
            );

            setNotifications((current) =>
                current.map((item) =>
                    item._id === notification._id
                        ? {
                              ...item,
                              isRead: true,
                          }
                        : item
                )
            );

            setUnreadCount((current) =>
                Math.max(0, current - 1)
            );
        } catch (error) {
            console.error(
                "Mark Notification Read Error:",
                error
            );
        }
    };

    const handleMarkAllAsRead = async () => {
        try {
            await markAllNotificationsAsRead();

            setNotifications((current) =>
                current.map((item) => ({
                    ...item,
                    isRead: true,
                }))
            );

            setUnreadCount(0);
        } catch (error) {
            console.error(
                "Mark All Notifications Error:",
                error
            );
        }
    };

    const handleAcceptInvitation = async (
        notification
    ) => {
        const invitationId =
            notification.invitation?._id;

        if (!invitationId) {
            return;
        }

        try {
            setActionLoading(
                notification._id
            );

            setError("");

            await acceptDashboardInvitation(
                invitationId
            );

            await refreshNotifications();
        } catch (error) {
            console.error(
                "Accept Invitation Error:",
                error
            );

            setError(
                error.response?.data?.message ||
                    "Unable to accept invitation."
            );
        } finally {
            setActionLoading("");
        }
    };

    const handleRejectInvitation = async (
        notification
    ) => {
        const invitationId =
            notification.invitation?._id;

        if (!invitationId) {
            return;
        }

        try {
            setActionLoading(
                notification._id
            );

            setError("");

            await rejectDashboardInvitation(
                invitationId
            );

            await refreshNotifications();
        } catch (error) {
            console.error(
                "Reject Invitation Error:",
                error
            );

            setError(
                error.response?.data?.message ||
                    "Unable to reject invitation."
            );
        } finally {
            setActionLoading("");
        }
    };

    const handleJoinRequestResponse = async (
        notification,
        approved
    ) => {
        const invitationId =
            notification.invitation?._id;

        if (!invitationId) {
            return;
        }

        try {
            setActionLoading(
                notification._id
            );

            setError("");

            await respondToJoinRequest(
                invitationId,
                approved
            );

            await refreshNotifications();
        } catch (error) {
            console.error(
                "Join Request Response Error:",
                error
            );

            setError(
                error.response?.data?.message ||
                    "Unable to respond to request."
            );
        } finally {
            setActionLoading("");
        }
    };

    const formatDate = (date) => {
        if (!date) {
            return "";
        }

        return new Date(date).toLocaleDateString(
            undefined,
            {
                day: "numeric",
                month: "short",
                year: "numeric",
            }
        );
    };

    return (
        <div
            className="notification-wrapper"
            ref={bellRef}
        >
            <button
                className="notification-bell"
                title="Notifications"
                onClick={handleToggle}
            >
                <svg
                    width="21"
                    height="21"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M18 8C18 4.686 15.314 2 12 2C8.686 2 6 4.686 6 8C6 15 3 15 3 17H21C21 15 18 15 18 8Z"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />

                    <path
                        d="M10 21H14"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                    />
                </svg>

                {unreadCount > 0 && (
                    <span className="notification-badge">
                        {unreadCount > 99
                            ? "99+"
                            : unreadCount}
                    </span>
                )}
            </button>

            {isOpen && (
                <div className="notification-dropdown">
                    <div className="notification-header">
                        <div>
                            <h3>
                                Notifications
                            </h3>

                            {unreadCount > 0 && (
                                <span>
                                    {unreadCount} unread
                                </span>
                            )}
                        </div>

                        {unreadCount > 0 && (
                            <button
                                className="mark-all-read-button"
                                onClick={
                                    handleMarkAllAsRead
                                }
                            >
                                Mark all read
                            </button>
                        )}
                    </div>

                    {error && (
                        <div className="notification-error">
                            {error}
                        </div>
                    )}

                    {loading ? (
                        <div className="notification-loading">
                            Loading notifications...
                        </div>
                    ) : notifications.length ===
                      0 ? (
                        <div className="notification-empty">
                            <div className="notification-empty-icon">
                                ✓
                            </div>

                            <strong>
                                You're all caught up
                            </strong>

                            <p>
                                No notifications
                                right now.
                            </p>
                        </div>
                    ) : (
                        <div className="notification-list">
                            {notifications.map(
                                (
                                    notification
                                ) => {
                                    const isInvitation =
                                        notification.type ===
                                        "DASHBOARD_INVITATION";

                                    const isJoinRequest =
                                        notification.type ===
                                        "JOIN_REQUEST";

                                    const isPending =
                                        notification
                                            .invitation
                                            ?.status ===
                                        "PENDING";

                                    return (
                                        <div
                                            key={
                                                notification._id
                                            }
                                            className={
                                                notification.isRead
                                                    ? "notification-item"
                                                    : "notification-item unread"
                                            }
                                            onClick={() =>
                                                handleMarkAsRead(
                                                    notification
                                                )
                                            }
                                        >
                                            <div className="notification-icon">
                                                {isInvitation
                                                    ? "✉"
                                                    : isJoinRequest
                                                    ? "↗"
                                                    : "●"}
                                            </div>

                                            <div className="notification-content">
                                                <p>
                                                    {
                                                        notification.message
                                                    }
                                                </p>

                                                <span>
                                                    {formatDate(
                                                        notification.createdAt
                                                    )}
                                                </span>

                                                {isInvitation &&
                                                    isPending && (
                                                        <div
                                                            className="notification-actions"
                                                            onClick={(
                                                                event
                                                            ) =>
                                                                event.stopPropagation()
                                                            }
                                                        >
                                                            <button
                                                                className="accept-notification-button"
                                                                disabled={
                                                                    actionLoading ===
                                                                    notification._id
                                                                }
                                                                onClick={() =>
                                                                    handleAcceptInvitation(
                                                                        notification
                                                                    )
                                                                }
                                                            >
                                                                {actionLoading ===
                                                                notification._id
                                                                    ? "Working..."
                                                                    : "Accept"}
                                                            </button>

                                                            <button
                                                                className="reject-notification-button"
                                                                disabled={
                                                                    actionLoading ===
                                                                    notification._id
                                                                }
                                                                onClick={() =>
                                                                    handleRejectInvitation(
                                                                        notification
                                                                    )
                                                                }
                                                            >
                                                                Reject
                                                            </button>
                                                        </div>
                                                    )}

                                                {isJoinRequest &&
                                                    isPending && (
                                                        <div
                                                            className="notification-actions"
                                                            onClick={(
                                                                event
                                                            ) =>
                                                                event.stopPropagation()
                                                            }
                                                        >
                                                            <button
                                                                className="accept-notification-button"
                                                                disabled={
                                                                    actionLoading ===
                                                                    notification._id
                                                                }
                                                                onClick={() =>
                                                                    handleJoinRequestResponse(
                                                                        notification,
                                                                        true
                                                                    )
                                                                }
                                                            >
                                                                {actionLoading ===
                                                                notification._id
                                                                    ? "Working..."
                                                                    : "Approve"}
                                                            </button>

                                                            <button
                                                                className="reject-notification-button"
                                                                disabled={
                                                                    actionLoading ===
                                                                    notification._id
                                                                }
                                                                onClick={() =>
                                                                    handleJoinRequestResponse(
                                                                        notification,
                                                                        false
                                                                    )
                                                                }
                                                            >
                                                                Reject
                                                            </button>
                                                        </div>
                                                    )}
                                            </div>

                                            {!notification.isRead && (
                                                <span className="notification-unread-dot"></span>
                                            )}
                                        </div>
                                    );
                                }
                            )}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default NotificationBell;