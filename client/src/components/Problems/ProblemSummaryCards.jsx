function ProblemSummaryCards({ problems }) {
    const totalSolved = problems.length;

    const leetcodeSolved = problems.filter(
        (problem) => problem.platform === "leetcode"
    ).length;

    const codeforcesSolved = problems.filter(
        (problem) => problem.platform === "codeforces"
    ).length;

    return (
        <div className="problem-summary-grid">
            <div className="summary-card">
                <h4>Total Solved</h4>
                <h2>{totalSolved}</h2>
            </div>

            <div className="summary-card">
                <h4>LeetCode</h4>
                <h2>{leetcodeSolved}</h2>
            </div>

            <div className="summary-card">
                <h4>Codeforces</h4>
                <h2>{codeforcesSolved}</h2>
            </div>
        </div>
    );
}

export default ProblemSummaryCards;