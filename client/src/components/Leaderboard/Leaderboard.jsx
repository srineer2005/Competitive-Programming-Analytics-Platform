function Leaderboard({ leaderboard }) {
    return (
        <section style={{ marginTop: "50px" }}>
            {/* Header */}
            <div style={{ marginBottom: "20px" }}>
                <h2
                    style={{
                        margin: 0,
                        fontSize: "24px",
                        fontWeight: "700",
                        color: "#1f2937",
                    }}
                >
                    🏆 Global Leaderboard
                </h2>

                <p
                    style={{
                        margin: "6px 0 0",
                        fontSize: "14px",
                        color: "#6b7280",
                    }}
                >
                    Compare coding performance across all registered users
                </p>
            </div>

            {/* Table Card */}
            <div
                style={{
                    background: "#ffffff",
                    borderRadius: "14px",
                    border: "1px solid #e5e7eb",
                    boxShadow: "0 4px 14px rgba(0, 0, 0, 0.05)",
                    overflow: "hidden",
                }}
            >
                <div style={{ overflowX: "auto" }}>
                    <table
                        style={{
                            width: "100%",
                            borderCollapse: "collapse",
                            minWidth: "750px",
                        }}
                    >
                        <thead>
                            <tr
                                style={{
                                    background: "#f8fafc",
                                    borderBottom: "1px solid #e5e7eb",
                                }}
                            >
                                <th style={headerStyle}>Rank</th>

                                <th
                                    style={{
                                        ...headerStyle,
                                        textAlign: "left",
                                    }}
                                >
                                    Name
                                </th>

                                <th style={headerStyle}>
                                    CF Rating
                                </th>

                                <th style={headerStyle}>
                                    CF Problems Solved
                                </th>

                                <th style={headerStyle}>
                                    LC Rating
                                </th>

                                <th style={headerStyle}>
                                    LC Problems Solved
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {leaderboard.length === 0 ? (
                                <tr>
                                    <td
                                        colSpan="6"
                                        style={{
                                            padding: "40px",
                                            textAlign: "center",
                                            color: "#6b7280",
                                        }}
                                    >
                                        No users available yet.
                                    </td>
                                </tr>
                            ) : (
                                leaderboard.map((user, index) => (
                                    <tr
                                        key={user.userId}
                                        style={{
                                            borderBottom:
                                                index === leaderboard.length - 1
                                                    ? "none"
                                                    : "1px solid #f0f1f3",
                                        }}
                                    >
                                        {/* Rank */}
                                        <td style={cellStyle}>
                                            <span
                                                style={{
                                                    display: "inline-flex",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    width: "34px",
                                                    height: "34px",
                                                    borderRadius: "50%",
                                                    background:
                                                        user.rank === 1
                                                            ? "#fff7d6"
                                                            : user.rank === 2
                                                            ? "#f1f3f5"
                                                            : user.rank === 3
                                                            ? "#f9eee5"
                                                            : "#f5f6f8",
                                                    fontWeight: "700",
                                                    color:
                                                        user.rank <= 3
                                                            ? "#374151"
                                                            : "#6b7280",
                                                }}
                                            >
                                                {user.rank}
                                            </span>
                                        </td>

                                        {/* Name */}
                                        <td
                                            style={{
                                                ...cellStyle,
                                                textAlign: "left",
                                            }}
                                        >
                                            <div
                                                style={{
                                                    fontWeight: "600",
                                                    color: "#1f2937",
                                                }}
                                            >
                                                {user.name}
                                            </div>
                                        </td>

                                        {/* CF Rating */}
                                        <td style={cellStyle}>
                                            <span
                                                style={{
                                                    fontWeight: "600",
                                                    color: "#2563eb",
                                                }}
                                            >
                                                {user.codeforcesRating || 0}
                                            </span>
                                        </td>

                                        {/* CF Problems */}
                                        <td style={cellStyle}>
                                            <span
                                                style={{
                                                    fontWeight: "600",
                                                    color: "#374151",
                                                }}
                                            >
                                                {(
                                                    user.codeforcesProblemsSolved ||
                                                    0
                                                ).toLocaleString()}
                                            </span>
                                        </td>

                                        {/* LC Rating */}
                                        <td style={cellStyle}>
                                            <span
                                                style={{
                                                    fontWeight: "600",
                                                    color: "#f59e0b",
                                                }}
                                            >
                                                {Math.round(
                                                    user.leetcodeRating || 0
                                                )}
                                            </span>
                                        </td>

                                        {/* LC Problems */}
                                        <td style={cellStyle}>
                                            <span
                                                style={{
                                                    fontWeight: "600",
                                                    color: "#374151",
                                                }}
                                            >
                                                {(
                                                    user.leetcodeProblemsSolved ||
                                                    0
                                                ).toLocaleString()}
                                            </span>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Footer */}
                {leaderboard.length > 0 && (
                    <div
                        style={{
                            padding: "14px 20px",
                            background: "#fafbfc",
                            borderTop: "1px solid #eef0f2",
                            fontSize: "13px",
                            color: "#6b7280",
                        }}
                    >
                        Showing all {leaderboard.length} registered users
                    </div>
                )}
            </div>
        </section>
    );
}

const headerStyle = {
    padding: "16px 18px",
    fontSize: "12px",
    fontWeight: "700",
    color: "#6b7280",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
    textAlign: "center",
    whiteSpace: "nowrap",
};

const cellStyle = {
    padding: "16px 18px",
    fontSize: "14px",
    textAlign: "center",
    whiteSpace: "nowrap",
};

export default Leaderboard;