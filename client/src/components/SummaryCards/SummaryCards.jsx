import "./SummaryCards.css";

function SummaryCards({ summary }) {
    const totalProblems = summary?.totalSolved || 0;

    const totalContests =
        (summary?.totalCodeforcesContests || 0) +
        (summary?.totalLeetCodeContests || 0);

    const platformsConnected =
        summary?.platformsConnected || 0;

    const cards = [
        {
            title: "Total Problems Solved",
            value: totalProblems,
            icon: "◆",
            accent: "green",
        },
        {
            title: "Total Contests Attended",
            value: totalContests,
            icon: "★",
            accent: "orange",
        },
        {
            title: "Platforms Connected",
            value: platformsConnected,
            icon: "●",
            accent: "yellow",
        },
    ];

    return (
        <div className="summary-container">
            {cards.map((card) => (
                <div
                    key={card.title}
                    className={`summary-card summary-card-${card.accent}`}
                >
                    <div className="summary-card-top">

                        <span className="summary-card-title">
                            {card.title}
                        </span>

                        <span className="summary-card-icon">
                            {card.icon}
                        </span>

                    </div>

                    <div className="summary-card-value">
                        {card.value.toLocaleString()}
                    </div>

                    <div className="summary-card-accent"></div>
                </div>
            ))}
        </div>
    );
}

export default SummaryCards;