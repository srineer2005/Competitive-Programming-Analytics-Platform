import { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import SummaryCards from "../components/SummaryCards/SummaryCards";
import GlobalLeaderboard from "../components/GlobalLeaderboard/GlobalLeaderboard";
import { getDashboard } from "../services/dashboard.service";

function Dashboard() {
    const [dashboard, setDashboard] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchDashboard = async () => {
            try {
                setLoading(true);
                setError("");

                const response = await getDashboard();

                setDashboard(response.data);
            } catch (error) {
                console.error(
                    "Failed to load dashboard:",
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

        fetchDashboard();
    }, []);

    if (loading) {
        return (
            <Layout>
                <div className="dashboard-loading">
                    <h2>Loading dashboard...</h2>
                    <p>
                        Fetching your coding statistics.
                    </p>
                </div>
            </Layout>
        );
    }

    if (error) {
        return (
            <Layout>
                <div className="dashboard-error">
                    <h2>Unable to load dashboard</h2>
                    <p>{error}</p>
                </div>
            </Layout>
        );
    }

    if (!dashboard) {
        return null;
    }

    return (
        <Layout>
            <div className="dashboard-page">
                <div className="dashboard-welcome">
                    <h1>
                        Welcome back,{" "}
                        {dashboard.user?.username} 👋
                    </h1>

                    <p>
                        Track your coding progress across
                        your platforms.
                    </p>
                </div>

                <SummaryCards
                    summary={dashboard.summary}
                />

                <GlobalLeaderboard />
            </div>
        </Layout>
    );
}

export default Dashboard;