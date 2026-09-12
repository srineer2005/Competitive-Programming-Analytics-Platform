import "./PerformanceCards.css";

function PerformanceCards({ summary, type }) {
    if (type === "codeforces") {
        return (
            <div className="performance-grid">
                <div className="performance-card performance-card-green">
                    <div className="performance-card-top">
                        <span className="performance-card-label">CURRENT RATING</span>
                        <span className="performance-card-icon">◆</span>
                    </div>
                    <p>{summary.currentCodeforcesRating}</p>
                </div>

                <div className="performance-card performance-card-yellow">
                    <div className="performance-card-top">
                        <span className="performance-card-label">HIGHEST RATING</span>
                        <span className="performance-card-icon">★</span>
                    </div>
                    <p>{summary.highestCodeforcesRating}</p>
                </div>

                <div className="performance-card performance-card-orange">
                    <div className="performance-card-top">
                        <span className="performance-card-label">PROBLEMS SOLVED</span>
                        <span className="performance-card-icon">✓</span>
                    </div>
                    <p>{summary.codeforcesProblemsSolved}</p>
                </div>

                <div className="performance-card performance-card-green">
                    <div className="performance-card-top">
                        <span className="performance-card-label">CODEFORCES CONTESTS</span>
                        <span className="performance-card-icon">●</span>
                    </div>
                    <p>{summary.totalCodeforcesContests}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="performance-grid">
            <div className="performance-card performance-card-green">
                <div className="performance-card-top">
                    <span className="performance-card-label">CURRENT RATING</span>
                    <span className="performance-card-icon">◆</span>
                </div>
                <p>{summary.currentLeetCodeRating}</p>
            </div>

            <div className="performance-card performance-card-yellow">
                <div className="performance-card-top">
                    <span className="performance-card-label">HIGHEST RATING</span>
                    <span className="performance-card-icon">★</span>
                </div>
                <p>{summary.highestLeetCodeRating}</p>
            </div>

            <div className="performance-card performance-card-orange">
                <div className="performance-card-top">
                    <span className="performance-card-label">PROBLEMS SOLVED</span>
                    <span className="performance-card-icon">✓</span>
                </div>
                <p>{summary.leetcodeProblemsSolved}</p>
            </div>

            <div className="performance-card performance-card-green">
                <div className="performance-card-top">
                    <span className="performance-card-label">EASY SOLVED</span>
                    <span className="performance-card-icon">●</span>
                </div>
                <p>{summary.leetcodeEasySolved}</p>
            </div>

            <div className="performance-card performance-card-yellow">
                <div className="performance-card-top">
                    <span className="performance-card-label">MEDIUM SOLVED</span>
                    <span className="performance-card-icon">●</span>
                </div>
                <p>{summary.leetcodeMediumSolved}</p>
            </div>

            <div className="performance-card performance-card-orange">
                <div className="performance-card-top">
                    <span className="performance-card-label">HARD SOLVED</span>
                    <span className="performance-card-icon">●</span>
                </div>
                <p>{summary.leetcodeHardSolved}</p>
            </div>

            <div className="performance-card performance-card-green">
                <div className="performance-card-top">
                    <span className="performance-card-label">LEETCODE CONTESTS</span>
                    <span className="performance-card-icon">●</span>
                </div>
                <p>{summary.totalLeetCodeContests}</p>
            </div>
        </div>
    );
}

export default PerformanceCards;