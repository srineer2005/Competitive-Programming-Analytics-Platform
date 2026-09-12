import "./RecentContests.css";

function RecentContests({ contests = [] }) {
    if (!contests.length) {
        return (
            <div className="recent-contests">
                <h2>Recent Contests</h2>
                <p>No contest history available.</p>
            </div>
        );
    }

    return (
        <div className="recent-contests">
            <h2>Recent Contests</h2>

            <table>
                <thead>
                    <tr>
                        <th>Contest</th>
                        <th>Rank</th>
                        <th>Old Rating</th>
                        <th>New Rating</th>
                        <th>Change</th>
                    </tr>
                </thead>

                <tbody>
                    {contests.map((contest, index) => {
                        const change =
                            contest.newRating - contest.oldRating;

                        return (
                            <tr key={index}>
                                <td>{contest.contestName}</td>
                                <td>{contest.rank}</td>
                                <td>{contest.oldRating}</td>
                                <td>{contest.newRating}</td>
                                <td
                                    className={
                                        change >= 0
                                            ? "positive"
                                            : "negative"
                                    }
                                >
                                    {change >= 0 ? "+" : ""}
                                    {change}
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default RecentContests;