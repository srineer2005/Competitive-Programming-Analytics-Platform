function ContestSummaryCards({ contests }) {
    const codeforcesCount = contests.codeforces.length;
    const leetcodeCount = contests.leetcode.length;
    const total = codeforcesCount + leetcodeCount;

    const allContests = [
        ...contests.codeforces,
        ...contests.leetcode,
    ].sort(
        (a, b) =>
            new Date(a.startTime) -
            new Date(b.startTime)
    );

    let nextContest = "-";

    if (allContests.length > 0) {
        const next = allContests[0];

        const diff =
            new Date(next.startTime) - new Date();

        if (diff > 0) {
            const hours = Math.floor(
                diff / (1000 * 60 * 60)
            );

            const minutes = Math.floor(
                (diff % (1000 * 60 * 60)) /
                    (1000 * 60)
            );

            nextContest = `${hours}h ${minutes}m`;
        }
    }

    return (
        <div className="contest-summary-grid">
            <div className="summary-card">
                <h4>Total</h4>
                <h2>{total}</h2>
            </div>

            <div className="summary-card">
                <h4>Codeforces</h4>
                <h2>{codeforcesCount}</h2>
            </div>

            <div className="summary-card">
                <h4>LeetCode</h4>
                <h2>{leetcodeCount}</h2>
            </div>

            <div className="summary-card">
                <h4>Next Contest</h4>
                <h2>{nextContest}</h2>
            </div>
        </div>
    );
}

export default ContestSummaryCards;