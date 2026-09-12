import { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import PerformanceCards from "../components/Performance/PerformanceCards";
import RatingChart from "../components/Performance/RatingChart";
import LeetCodeRatingChart from "../components/Performance/LeetCodeRatingChart";
import RecentContests from "../components/Performance/RecentContests";
import RecentLeetCodeContests from "../components/Performance/RecentLeetCodeContests";
import { getPerformance } from "../services/performance.service";
import "../styles/Performance.css";

function Performance() {
    const [dashboard, setDashboard] = useState(null);

    useEffect(() => {
        const fetchPerformance = async () => {
            try {
                const response = await getPerformance();

                console.log(
                    "Performance Response:",
                    response
                );

                setDashboard(response.data);
            } catch (error) {
                console.error(
                    "Performance Error:",
                    error
                );
            }
        };

        fetchPerformance();
    }, []);

    if (!dashboard) {
        return (
            <Layout>
                <div className="performance-loading">
                    <div className="loading-spinner"></div>

                    <h2>Loading performance...</h2>

                    <p>
                        Fetching your coding statistics.
                    </p>
                </div>
            </Layout>
        );
    }

    const summary = dashboard.summary || {};

    return (
        <Layout>
            <div className="performance-page">

                {/* ================= PAGE HEADER ================= */}

                <div className="performance-header">

                    <div className="performance-header-content">

                        <span className="performance-eyebrow">
                            PERFORMANCE
                        </span>

                        <h1>
                            Your Coding Performance
                        </h1>

                        <p>
                            Track your competitive programming
                            growth, ratings and contest performance.
                        </p>

                    </div>

                    <div className="performance-total">

                        <span>
                            TOTAL PROBLEMS
                        </span>

                        <strong>
                            {(
                                summary.totalSolved || 0
                            ).toLocaleString()}
                        </strong>

                    </div>

                </div>


                {/* ================= CODEFORCES ================= */}

                <section className="performance-platform-section">

                    <div className="platform-heading">

                        <div className="platform-icon codeforces-icon">
                            CF
                        </div>

                        <div className="platform-heading-content">

                            <div className="platform-title-row">

                                <h2>
                                    Codeforces
                                </h2>

                                <span className="platform-tag">
                                    CONTESTS
                                </span>

                            </div>

                            <p>
                                Rating progression and contest performance
                            </p>

                        </div>

                    </div>


                    <div className="performance-section-divider"></div>


                    <PerformanceCards
                        summary={summary}
                        type="codeforces"
                    />


                    <div className="performance-chart-section">

                        <div className="subsection-heading">

                            <div>
                                <span>
                                    RATING HISTORY
                                </span>

                                <h3>
                                    Codeforces Rating
                                </h3>
                            </div>

                        </div>

                        <RatingChart
                            contests={
                                dashboard.codeforces?.contests || []
                            }
                        />

                    </div>


                    <div className="performance-recent-section">

                        <div className="subsection-heading">

                            <div>
                                <span>
                                    RECENT ACTIVITY
                                </span>

                                <h3>
                                    Recent Codeforces Contests
                                </h3>
                            </div>

                        </div>

                        <RecentContests
                            contests={
                                dashboard.codeforces
                                    ?.recentContests || []
                            }
                        />

                    </div>

                </section>


                {/* ================= LEETCODE ================= */}

                <section className="performance-platform-section">

                    <div className="platform-heading">

                        <div className="platform-icon leetcode-icon">
                            LC
                        </div>

                        <div className="platform-heading-content">

                            <div className="platform-title-row">

                                <h2>
                                    LeetCode
                                </h2>

                                <span className="platform-tag leetcode-tag">
                                    CONTESTS
                                </span>

                            </div>

                            <p>
                                Problems, ratings and contest performance
                            </p>

                        </div>

                    </div>


                    <div className="performance-section-divider"></div>


                    <PerformanceCards
                        summary={summary}
                        type="leetcode"
                    />


                    <div className="performance-chart-section">

                        <div className="subsection-heading">

                            <div>
                                <span>
                                    RATING HISTORY
                                </span>

                                <h3>
                                    LeetCode Rating
                                </h3>
                            </div>

                        </div>

                        <LeetCodeRatingChart
                            contests={
                                dashboard.leetcode
                                    ?.contests || []
                            }
                        />

                    </div>


                    <div className="performance-recent-section">

                        <div className="subsection-heading">

                            <div>
                                <span>
                                    RECENT ACTIVITY
                                </span>

                                <h3>
                                    Recent LeetCode Contests
                                </h3>
                            </div>

                        </div>

                        <RecentLeetCodeContests
                            contests={
                                dashboard.leetcode
                                    ?.recentContests || []
                            }
                        />

                    </div>

                </section>

            </div>
        </Layout>
    );
}

export default Performance;