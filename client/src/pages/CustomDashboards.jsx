import {
    useEffect,
    useRef,
    useState,
} from "react";

import { useNavigate } from "react-router-dom";

import Layout from "../components/Layout/Layout";

import {
    getMyDashboards,
    getDiscoverableDashboards,
    createDashboard,
} from "../services/customDashboard.service";

import { scrollToElement } from "../utils/scrollToElement";

import "../styles/CustomDashboards.css";

function CustomDashboards() {
    const navigate = useNavigate();

    const [dashboards, setDashboards] = useState([]);
    const [discoverableDashboards, setDiscoverableDashboards] =
        useState([]);

    const [loading, setLoading] = useState(true);
    const [discoverLoading, setDiscoverLoading] =
        useState(true);

    const [showCreateForm, setShowCreateForm] =
        useState(false);

    const [name, setName] = useState("");
    const [description, setDescription] =
        useState("");

    const [creating, setCreating] = useState(false);
    const [error, setError] = useState("");

    const createPanelRef = useRef(null);

    const loadDashboards = async () => {
        try {
            setLoading(true);
            setError("");

            const data = await getMyDashboards();

            setDashboards(data.dashboards || []);
        } catch (error) {
            console.error(
                "Dashboard Error:",
                error
            );

            setError(
                error.response?.data?.message ||
                    "Unable to load dashboards."
            );
        } finally {
            setLoading(false);
        }
    };

    const loadDiscoverableDashboards = async () => {
        try {
            setDiscoverLoading(true);

            const response =
                await getDiscoverableDashboards();

            setDiscoverableDashboards(
                response.dashboards || []
            );
        } catch (error) {
            console.error(
                "Failed to load discoverable dashboards:",
                error
            );
        } finally {
            setDiscoverLoading(false);
        }
    };

    useEffect(() => {
        loadDashboards();
        loadDiscoverableDashboards();
    }, []);

    const openCreateForm = () => {
        setShowCreateForm(true);
        setError("");

        setTimeout(() => {
            scrollToElement(
                createPanelRef.current
            );
        }, 0);
    };

    const toggleCreateForm = () => {
        if (showCreateForm) {
            setShowCreateForm(false);
            setError("");
            return;
        }

        openCreateForm();
    };

    const handleCreateDashboard = async (
        event
    ) => {
        event.preventDefault();

        if (!name.trim()) {
            setError(
                "Dashboard name is required."
            );

            return;
        }

        try {
            setCreating(true);
            setError("");

            await createDashboard({
                name: name.trim(),
                description:
                    description.trim(),
            });

            setName("");
            setDescription("");
            setShowCreateForm(false);

            await loadDashboards();
        } catch (error) {
            console.error(
                "Create Dashboard Error:",
                error
            );

            setError(
                error.response?.data?.message ||
                    "Unable to create dashboard."
            );
        } finally {
            setCreating(false);
        }
    };

    if (loading) {
        return (
            <Layout>
                <div className="dashboards-loading">
                    <div className="dashboards-spinner"></div>

                    <h2>
                        Loading dashboards
                    </h2>

                    <p>
                        Fetching your coding
                        dashboards...
                    </p>
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <div className="dashboards-page">

                {/* HERO */}

                <section className="dashboards-hero">
                    <div className="dashboards-hero-content">

                        <div className="dashboards-eyebrow">
                            <span className="eyebrow-dot"></span>
                            COLLABORATIVE CODING
                        </div>

                        <h1>
                            Your
                            <span> Dashboards</span>
                        </h1>

                        <p>
                            Create private coding
                            spaces, invite friends,
                            and compare your
                            competitive programming
                            performance.
                        </p>

                    </div>

                    <button
                        className="create-dashboard-button"
                        onClick={toggleCreateForm}
                    >
                        <span className="create-button-icon">
                            +
                        </span>

                        <span>
                            Create Dashboard
                        </span>
                    </button>
                </section>

                {/* ERROR */}

                {error && (
                    <div className="dashboard-error">
                        <span>!</span>
                        {error}
                    </div>
                )}

                {/* CREATE FORM */}

                {showCreateForm && (
                    <section
                        ref={createPanelRef}
                        className="create-dashboard-panel"
                    >
                        <div className="create-panel-heading">

                            <div className="create-panel-icon">
                                +
                            </div>

                            <div>
                                <h2>
                                    Create a new
                                    dashboard
                                </h2>

                                <p>
                                    Set up a shared
                                    space for your
                                    coding group.
                                </p>
                            </div>

                            <button
                                className="close-create-button"
                                onClick={() => {
                                    setShowCreateForm(
                                        false
                                    );
                                    setError("");
                                }}
                                aria-label="Close"
                            >
                                ×
                            </button>
                        </div>

                        <form
                            onSubmit={
                                handleCreateDashboard
                            }
                            className="create-dashboard-form"
                        >
                            <div className="dashboard-form-group">
                                <label>
                                    Dashboard Name
                                </label>

                                <input
                                    type="text"
                                    placeholder="e.g. Friends CP Dashboard"
                                    value={name}
                                    onChange={(
                                        event
                                    ) =>
                                        setName(
                                            event.target
                                                .value
                                        )
                                    }
                                    maxLength={100}
                                />

                                <span className="input-hint">
                                    Choose a name that
                                    your group will
                                    recognize.
                                </span>
                            </div>

                            <div className="dashboard-form-group">
                                <label>
                                    Description
                                    <span>
                                        Optional
                                    </span>
                                </label>

                                <textarea
                                    placeholder="What is this dashboard for?"
                                    value={
                                        description
                                    }
                                    onChange={(
                                        event
                                    ) =>
                                        setDescription(
                                            event.target
                                                .value
                                        )
                                    }
                                    maxLength={300}
                                    rows={4}
                                />

                                <span className="input-hint">
                                    {description.length}
                                    /300 characters
                                </span>
                            </div>

                            <div className="dashboard-form-actions">
                                <button
                                    type="button"
                                    className="cancel-dashboard-button"
                                    onClick={() => {
                                        setShowCreateForm(
                                            false
                                        );
                                        setError("");
                                    }}
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    className="submit-dashboard-button"
                                    disabled={creating}
                                >
                                    {creating
                                        ? "Creating..."
                                        : "Create Dashboard"}
                                </button>
                            </div>
                        </form>
                    </section>
                )}

                {/* YOUR DASHBOARDS */}

                <section className="dashboards-section">
                    <div className="section-heading">
                        <div>
                            <span className="section-eyebrow">
                                YOUR SPACE
                            </span>

                            <h2>
                                Your Dashboards
                            </h2>

                            <p>
                                Dashboards you own
                                or have joined.
                            </p>
                        </div>

                        <div className="dashboard-count-badge">
                            <strong>
                                {dashboards.length}
                            </strong>

                            <span>
                                {dashboards.length ===
                                1
                                    ? "dashboard"
                                    : "dashboards"}
                            </span>
                        </div>
                    </div>

                    {dashboards.length === 0 ? (
                        <div className="empty-dashboards">
                            <div className="empty-dashboard-visual">
                                <div className="empty-icon-card">
                                    <span>▦</span>
                                </div>

                                <div className="empty-plus">
                                    +
                                </div>
                            </div>

                            <h2>
                                No dashboards yet
                            </h2>

                            <p>
                                Create your first
                                dashboard and start
                                comparing coding
                                performance with your
                                friends.
                            </p>

                            <button
                                className="empty-create-button"
                                onClick={
                                    openCreateForm
                                }
                            >
                                <span>+</span>
                                Create Your First
                                Dashboard
                            </button>
                        </div>
                    ) : (
                        <div className="dashboard-grid">
                            {dashboards.map(
                                (dashboard) => {
                                    const isOwner =
                                        dashboard.owner?._id;

                                    const memberCount =
                                        dashboard.members
                                            ?.length || 0;

                                    return (
                                        <article
                                            className="dashboard-card"
                                            key={
                                                dashboard._id
                                            }
                                            onClick={() =>
                                                navigate(
                                                    `/dashboards/${dashboard._id}`
                                                )
                                            }
                                        >
                                            <div className="dashboard-card-glow"></div>

                                            <div className="dashboard-card-top">
                                                <div className="dashboard-icon">
                                                    <span>
                                                        ▦
                                                    </span>
                                                </div>

                                                <span
                                                    className={
                                                        isOwner
                                                            ? "dashboard-role owner-role"
                                                            : "dashboard-role member-role"
                                                    }
                                                >
                                                    <span className="role-dot"></span>

                                                    {isOwner
                                                        ? "Owner"
                                                        : "Member"}
                                                </span>
                                            </div>

                                            <div className="dashboard-card-content">
                                                <h3>
                                                    {
                                                        dashboard.name
                                                    }
                                                </h3>

                                                <p className="dashboard-description">
                                                    {dashboard.description ||
                                                        "No description provided."}
                                                </p>
                                            </div>

                                            <div className="dashboard-card-divider"></div>

                                            <div className="dashboard-card-info">
                                                <div className="dashboard-owner-info">
                                                    <div className="owner-avatar">
                                                        {dashboard
                                                            .owner
                                                            ?.username
                                                            ?.charAt(
                                                                0
                                                            )
                                                            ?.toUpperCase()}
                                                    </div>

                                                    <div>
                                                        <span>
                                                            Owner
                                                        </span>

                                                        <strong>
                                                            {
                                                                dashboard
                                                                    .owner
                                                                    ?.username
                                                            }
                                                        </strong>
                                                    </div>
                                                </div>

                                                <div className="member-info">
                                                    <span>
                                                        Members
                                                    </span>

                                                    <strong>
                                                        {memberCount +
                                                            1}
                                                    </strong>
                                                </div>
                                            </div>

                                            <button
                                                className="open-dashboard-button"
                                                onClick={(
                                                    event
                                                ) => {
                                                    event.stopPropagation();

                                                    navigate(
                                                        `/dashboards/${dashboard._id}`
                                                    );
                                                }}
                                            >
                                                <span>
                                                    Open Dashboard
                                                </span>

                                                <span className="open-arrow">
                                                    →
                                                </span>
                                            </button>
                                        </article>
                                    );
                                }
                            )}
                        </div>
                    )}
                </section>

                {/* DISCOVER */}

                <section className="discover-section">
                    <div className="section-heading">
                        <div>
                            <span className="section-eyebrow">
                                EXPLORE
                            </span>

                            <h2>
                                Discover Dashboards
                            </h2>

                            <p>
                                Find dashboards you
                                can request to join.
                            </p>
                        </div>

                        <div className="discover-badge">
                            {
                                discoverableDashboards.length
                            }
                        </div>
                    </div>

                    {discoverLoading ? (
                        <div className="discover-loading">
                            Loading available
                            dashboards...
                        </div>
                    ) : discoverableDashboards.length ===
                      0 ? (
                        <div className="discover-empty">
                            <div className="discover-empty-icon">
                                ◇
                            </div>

                            <div>
                                <h3>
                                    No dashboards to
                                    discover
                                </h3>

                                <p>
                                    New public
                                    dashboards will
                                    appear here when
                                    available.
                                </p>
                            </div>
                        </div>
                    ) : (
                        <div className="discover-grid">
                            {discoverableDashboards.map(
                                (dashboard) => (
                                    <div
                                        className="discover-card"
                                        key={
                                            dashboard._id
                                        }
                                    >
                                        <div className="discover-card-icon">
                                            ▦
                                        </div>

                                        <div className="discover-card-content">
                                            <h3>
                                                {
                                                    dashboard.name
                                                }
                                            </h3>

                                            <p>
                                                {dashboard.description ||
                                                    "No description provided."}
                                            </p>

                                            <span>
                                                Created by{" "}
                                                <strong>
                                                    {
                                                        dashboard
                                                            .owner
                                                            ?.username
                                                    }
                                                </strong>
                                            </span>
                                        </div>
                                    </div>
                                )
                            )}
                        </div>
                    )}
                </section>
            </div>
        </Layout>
    );
}

export default CustomDashboards;