import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Layout from "../components/Layout/Layout";

import {
    getDashboardById,
    sendDashboardInvitation,
    removeDashboardMember,
    leaveDashboard,
} from "../services/customDashboard.service";

import "../styles/CustomDashboard.css";
import { scrollToElement } from "../utils/scrollToElement";

function CustomDashboard() {
    const { dashboardId } = useParams();
    const navigate = useNavigate();

    const [dashboard, setDashboard] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [showInviteForm, setShowInviteForm] =
        useState(false);

    const [showManageMembers, setShowManageMembers] =
        useState(false);

    const inviteFormRef = useRef(null);
const manageMembersRef = useRef(null);

    const [recipientEmail, setRecipientEmail] =
        useState("");

    const [sendingInvitation, setSendingInvitation] =
        useState(false);

    const [removingMemberId, setRemovingMemberId] =
        useState(null);

    const [leavingDashboard, setLeavingDashboard] =
        useState(false);

    const [inviteMessage, setInviteMessage] =
        useState("");

    const [inviteError, setInviteError] =
        useState("");

    const [actionError, setActionError] =
        useState("");

    const loadDashboard = async () => {
        try {
            setLoading(true);
            setError("");

            const data =
                await getDashboardById(dashboardId);

            setDashboard(data.dashboard);
        } catch (error) {
            console.error(
                "Custom Dashboard Error:",
                error
            );

            setError(
                error.response?.data?.message ||
                    "Unable to load dashboard."
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadDashboard();
    }, [dashboardId]);

    const openInviteForm = () => {
        setShowInviteForm(true);
        scrollToElement(inviteFormRef.current);
    };

    const toggleInviteForm = () => {
    if (showInviteForm) {
        setShowInviteForm(false);
        setInviteMessage("");
        setInviteError("");
        return;
    }

    setShowInviteForm(true);
    setInviteMessage("");
    setInviteError("");

    setTimeout(() => {
        inviteFormRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "center",
        });
    }, 100);
};

    const openManageMembers = () => {
        setShowManageMembers(true);
        setActionError("");
        scrollToElement(manageMembersRef.current);
    };

    const toggleManageMembers = () => {
    if (showManageMembers) {
        setShowManageMembers(false);
        setActionError("");
        return;
    }

    setShowManageMembers(true);
    setActionError("");

    setTimeout(() => {
        manageMembersRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "center",
        });
    }, 100);
};

    const handleSendInvitation = async (event) => {
        event.preventDefault();

        if (!recipientEmail.trim()) {
            setInviteError(
                "Please enter the user's email."
            );
            return;
        }

        try {
            setSendingInvitation(true);
            setInviteError("");
            setInviteMessage("");

            await sendDashboardInvitation(
                dashboardId,
                recipientEmail.trim()
            );

            setRecipientEmail("");

            setInviteMessage(
                "Invitation sent successfully."
            );
        } catch (error) {
            console.error(
                "Invitation Error:",
                error
            );

            setInviteError(
                error.response?.data?.message ||
                    "Unable to send invitation."
            );
        } finally {
            setSendingInvitation(false);
        }
    };

    const handleRemoveMember = async (
        memberId,
        memberName
    ) => {
        const confirmed = window.confirm(
            `Remove ${memberName} from this dashboard?`
        );

        if (!confirmed) {
            return;
        }

        try {
            setRemovingMemberId(memberId);
            setActionError("");

            await removeDashboardMember(
                dashboardId,
                memberId
            );

            await loadDashboard();
        } catch (error) {
            console.error(
                "Remove Member Error:",
                error
            );

            setActionError(
                error.response?.data?.message ||
                    "Unable to remove member."
            );
        } finally {
            setRemovingMemberId(null);
        }
    };

    const handleLeaveDashboard = async () => {
        const confirmed = window.confirm(
            "Are you sure you want to leave this dashboard?"
        );

        if (!confirmed) {
            return;
        }

        try {
            setLeavingDashboard(true);
            setActionError("");

            await leaveDashboard(dashboardId);

            navigate("/dashboards");
        } catch (error) {
            console.error(
                "Leave Dashboard Error:",
                error
            );

            setActionError(
                error.response?.data?.message ||
                    "Unable to leave dashboard."
            );

            setLeavingDashboard(false);
        }
    };

    if (loading) {
        return (
            <Layout>
                <div className="custom-dashboard-loading">
                    <div className="custom-dashboard-spinner"></div>

                    <h2>
                        Loading dashboard...
                    </h2>

                    <p>
                        Fetching dashboard
                        information.
                    </p>
                </div>
            </Layout>
        );
    }

    if (error) {
        return (
            <Layout>
                <div className="custom-dashboard-error-page">
                    <div className="custom-dashboard-error-icon">
                        !
                    </div>

                    <h2>
                        Unable to load dashboard
                    </h2>

                    <p>{error}</p>

                    <button
                        onClick={() =>
                            navigate("/dashboards")
                        }
                    >
                        ← Back to Dashboards
                    </button>
                </div>
            </Layout>
        );
    }

    const isOwner =
        dashboard.isOwner === true;

    return (
        <Layout>
            <div className="custom-dashboard-page">
                <button
                    className="back-to-dashboards"
                    onClick={() =>
                        navigate("/dashboards")
                    }
                >
                    ← Back to Dashboards
                </button>

                <div className="custom-dashboard-header">
                    <div className="custom-dashboard-header-content">
                        <div className="dashboard-detail-label">
                            CUSTOM DASHBOARD
                        </div>

                        <h1>{dashboard.name}</h1>

                        <p>
                            {dashboard.description ||
                                "No description provided."}
                        </p>

                        <div className="dashboard-owner">
                            <div className="dashboard-owner-avatar">
                                {dashboard.owner?.username
                                    ?.charAt(0)
                                    ?.toUpperCase()}
                            </div>

                            <div className="dashboard-owner-info">
                                <span>
                                    Owned by
                                </span>

                                <strong>
                                    {
                                        dashboard
                                            .owner
                                            ?.name
                                    }
                                </strong>
                            </div>
                        </div>
                    </div>

                    <div className="dashboard-header-actions">
                        {isOwner ? (
                            <>
                                <button
                                    className="manage-members-button"
                                    onClick={toggleManageMembers}
                                >
                                    <span>⚙</span>
                                    Manage Members
                                </button>

                                <button
                                    className="invite-member-button"
                                    onClick={toggleInviteForm}
                                >
                                    <span>+</span>
                                    Invite Member
                                </button>
                            </>
                        ) : (
                            <button
                                className="leave-dashboard-button"
                                onClick={
                                    handleLeaveDashboard
                                }
                                disabled={
                                    leavingDashboard
                                }
                            >
                                {leavingDashboard
                                    ? "Leaving..."
                                    : "Leave Dashboard"}
                            </button>
                        )}
                    </div>
                </div>

                {isOwner &&
                    showManageMembers && (
                        <div
                            ref={manageMembersRef}
                            className="manage-members-card"
                        >
                            <div className="manage-members-header">
                                <div>
                                    <h2>
                                        Manage Members
                                    </h2>

                                    <p>
                                        Remove users from
                                        this dashboard.
                                    </p>
                                </div>

                                <button
                                    className="close-manage-button"
                                    onClick={() =>
                                        setShowManageMembers(
                                            false
                                        )
                                    }
                                >
                                    ×
                                </button>
                            </div>

                            {actionError && (
                                <div className="action-error-message">
                                    {actionError}
                                </div>
                            )}

                            {dashboard.members?.length ===
                            0 ? (
                                <div className="no-members-message">
                                    No members have joined
                                    this dashboard yet.
                                </div>
                            ) : (
                                <div className="manage-members-list">
                                    {dashboard.members.map(
                                        (member) => (
                                            <div
                                                className="manage-member-row"
                                                key={
                                                    member._id
                                                }
                                            >
                                                <div className="manage-member-info">
                                                    <div className="manage-member-avatar">
                                                        {member.username
                                                            ?.charAt(
                                                                0
                                                            )
                                                            ?.toUpperCase()}
                                                    </div>

                                                    <div>
                                                        <strong>
                                                            {
                                                                member.name
                                                            }
                                                        </strong>

                                                        <span>
                                                            {
                                                                member.email
                                                            }
                                                        </span>
                                                    </div>
                                                </div>

                                                <button
                                                    className="remove-member-button"
                                                    onClick={() =>
                                                        handleRemoveMember(
                                                            member._id,
                                                            member.username
                                                        )
                                                    }
                                                    disabled={
                                                        removingMemberId ===
                                                        member._id
                                                    }
                                                >
                                                    {removingMemberId ===
                                                    member._id
                                                        ? "Removing..."
                                                        : "Remove"}
                                                </button>
                                            </div>
                                        )
                                    )}
                                </div>
                            )}
                        </div>
                    )}

                {isOwner &&
                    showInviteForm && (
                        <div
                            ref={inviteFormRef}
                            className="invite-member-card"
                        >
                            <div className="invite-card-header">
                                <div>
                                    <h2>
                                        Invite a Member
                                    </h2>

                                    <p>
                                        Send an invitation
                                        to another
                                        registered CP
                                        Analytics user.
                                    </p>
                                </div>

                                <button
                                    className="close-invite-button"
                                    onClick={() => {
                                        setShowInviteForm(
                                            false
                                        );

                                        setInviteMessage(
                                            ""
                                        );

                                        setInviteError(
                                            ""
                                        );
                                    }}
                                >
                                    ×
                                </button>
                            </div>

                            <form
                                onSubmit={
                                    handleSendInvitation
                                }
                            >
                                <div className="invite-form-row">
                                    <div className="invite-form-group">
                                        <label>
                                            User Email
                                        </label>

                                        <input
                                            type="email"
                                            placeholder="friend@example.com"
                                            value={
                                                recipientEmail
                                            }
                                            onChange={(
                                                event
                                            ) =>
                                                setRecipientEmail(
                                                    event
                                                        .target
                                                        .value
                                                )
                                            }
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        className="send-invitation-button"
                                        disabled={
                                            sendingInvitation
                                        }
                                    >
                                        {sendingInvitation
                                            ? "Sending..."
                                            : "Send Invitation"}
                                    </button>
                                </div>
                            </form>

                            {inviteMessage && (
                                <div className="invite-success-message">
                                    ✓{" "}
                                    {inviteMessage}
                                </div>
                            )}

                            {inviteError && (
                                <div className="invite-error-message">
                                    {inviteError}
                                </div>
                            )}
                        </div>
                    )}

                {!isOwner && actionError && (
                    <div className="action-error-message standalone-action-error">
                        {actionError}
                    </div>
                )}

                <div className="custom-leaderboard-section">
                    <div className="dashboard-section-heading">
                        <div>
                            <h2>Leaderboard</h2>

                            <p>
                                Coding performance
                                of everyone in this
                                dashboard.
                            </p>
                        </div>
                    </div>

                    <div className="custom-leaderboard-card">
                        {dashboard.leaderboard?.length ===
                        0 ? (
                            <div className="custom-leaderboard-empty">
                                No leaderboard data
                                available yet.
                            </div>
                        ) : (
                            <div className="custom-leaderboard-table-wrapper">
                                <table className="custom-leaderboard-table">
                                    <thead>
                                        <tr>
                                            <th>
                                                Rank
                                            </th>

                                            <th>
                                                Username
                                            </th>

                                            <th>
                                                CF Rating
                                            </th>

                                            <th>
                                                CF Problems
                                            </th>

                                            <th>
                                                LeetCode Rating
                                            </th>

                                            <th>
                                                LC Problems
                                            </th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {dashboard.leaderboard.map(
                                            (user) => (
                                                <tr
                                                    key={
                                                        user.userId
                                                    }
                                                >
                                                    <td>
                                                        <span
                                                            className={
                                                                user.rank ===
                                                                1
                                                                    ? "custom-rank first-rank"
                                                                    : user.rank ===
                                                                      2
                                                                    ? "custom-rank second-rank"
                                                                    : user.rank ===
                                                                      3
                                                                    ? "custom-rank third-rank"
                                                                    : "custom-rank"
                                                            }
                                                        >
                                                            {
                                                                user.rank
                                                            }
                                                        </span>
                                                    </td>

                                                    <td>
                                                        <div className="custom-user-cell">
                                                            <div className="custom-user-avatar">
                                                                {user.username
                                                                    ?.charAt(
                                                                        0
                                                                    )
                                                                    ?.toUpperCase()}
                                                            </div>

                                                            <strong>
                                                                {
                                                                    user.username
                                                                }
                                                            </strong>
                                                        </div>
                                                    </td>

                                                    <td>
                                                        <strong>
                                                            {
                                                                user.codeforcesRating
                                                            }
                                                        </strong>
                                                    </td>

                                                    <td>
                                                        {
                                                            user.codeforcesProblemsSolved
                                                        }
                                                    </td>

                                                    <td>
                                                        <strong>
                                                            {
                                                                user.leetcodeRating
                                                            }
                                                        </strong>
                                                    </td>

                                                    <td>
                                                        {
                                                            user.leetcodeProblemsSolved
                                                        }
                                                    </td>
                                                </tr>
                                            )
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default CustomDashboard;