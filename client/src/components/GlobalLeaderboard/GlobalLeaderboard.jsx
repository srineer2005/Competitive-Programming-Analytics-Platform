import { useEffect, useState } from "react";
import { getLeaderboard } from "../../services/leaderboard.service";
import "./GlobalLeaderboard.css";

function GlobalLeaderboard() {
    const [leaderboard, setLeaderboard] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchLeaderboard = async () => {
            try {
                setLoading(true);
                setError("");

                const response = await getLeaderboard();

                setLeaderboard(response.data || []);
            } catch (error) {
                console.error(
                    "Failed to load global leaderboard:",
                    error
                );

                setError(
                    error.response?.data?.message ||
                        "Unable to load leaderboard."
                );
            } finally {
                setLoading(false);
            }
        };

        fetchLeaderboard();
    }, []);

    const getRankClass = (rank) => {
        if (rank === 1) return "rank-gold";
        if (rank === 2) return "rank-silver";
        if (rank === 3) return "rank-bronze";

        return "";
    };

    return (
        <section className="global-leaderboard">
            <div className="global-leaderboard-header">
                <div className="leaderboard-heading">
                    <span className="leaderboard-eyebrow">
                        GLOBAL RANKINGS
                    </span>

                    <h2>
                        Global Leaderboard
                    </h2>

                    <p>
                        Compare coding performance across
                        all registered users.
                    </p>
                </div>

                <div className="leaderboard-accent">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>

            {loading ? (
                <div className="leaderboard-state">
                    <div className="leaderboard-loader"></div>
                    <p>Loading leaderboard...</p>
                </div>
            ) : error ? (
                <div className="leaderboard-state leaderboard-error">
                    <div className="state-icon">!</div>
                    <p>{error}</p>
                </div>
            ) : leaderboard.length === 0 ? (
                <div className="leaderboard-state">
                    <div className="state-icon">—</div>
                    <p>
                        No leaderboard data available.
                    </p>
                </div>
            ) : (
                <div className="leaderboard-table-wrapper">
                    <table className="global-leaderboard-table">
                        <thead>
                            <tr>
                                <th className="rank-column">
                                    Rank
                                </th>

                                <th>
                                    Username
                                </th>

                                <th>
                                    Codeforces Rating
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
                            {leaderboard.map((user) => (
                                <tr key={user.userId}>
                                    <td className="rank-column">
                                        <div
                                            className={`rank-badge ${getRankClass(
                                                user.rank
                                            )}`}
                                        >
                                            {user.rank}
                                        </div>
                                    </td>

                                    <td>
                                        <div className="user-name-cell">
                                            <div className="user-avatar">
                                                {user.username
                                                    ?.charAt(0)
                                                    ?.toUpperCase() ||
                                                    "U"}
                                            </div>

                                            <strong>
                                                {user.username ||
                                                    "Unknown User"}
                                            </strong>
                                        </div>
                                    </td>

                                    <td>
                                        <span className="rating">
                                            {(
                                                user.codeforcesRating ||
                                                0
                                            ).toLocaleString()}
                                        </span>
                                    </td>

                                    <td>
                                        <span className="problems-value">
                                            {(
                                                user.codeforcesProblemsSolved ||
                                                0
                                            ).toLocaleString()}
                                        </span>
                                    </td>

                                    <td>
                                        <span className="rating">
                                            {(
                                                user.leetcodeRating ||
                                                0
                                            ).toLocaleString()}
                                        </span>
                                    </td>

                                    <td>
                                        <span className="problems-value">
                                            {(
                                                user.leetcodeProblemsSolved ||
                                                0
                                            ).toLocaleString()}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </section>
    );
}

export default GlobalLeaderboard;