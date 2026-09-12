import "./RecentContests.css";

function RecentLeetCodeContests({ contests = [] }) {
    if (contests.length === 0) {
        return (
            <div className="recent-contests">
                <h2>Recent LeetCode Contests</h2>
                <p>No recent LeetCode contests found.</p>
            </div>
        );
    }

    return (
        <div className="recent-contests">
            <h2>Recent LeetCode Contests</h2>

            <table>
                <thead>
                    <tr>
                        <th>Contest</th>
                        <th>Date</th>
                        <th>Rank</th>
                        <th>Rating</th>
                        <th>Solved</th>
                    </tr>
                </thead>

                <tbody>
                    {contests.map((contest) => (
                        <tr key={contest._id}>
                            <td>{contest.contestTitle}</td>
                            <td>
                                {new Date(
                                    contest.contestStartTime
                                ).toLocaleDateString()}
                            </td>
                            <td>{contest.ranking}</td>
                            <td>{Math.round(contest.rating)}</td>
                            <td>
                                {contest.problemsSolved}/{contest.totalProblems}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default RecentLeetCodeContests;