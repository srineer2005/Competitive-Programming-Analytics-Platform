import ContestCard from "./ContestCard";

function ContestList({ title, contests, recent = false }) {
    return (
        <div className="platform-column">

            <div className="platform-column-header">

                <div className="platform-title">

                    <span
                        className={
                            title === "Codeforces"
                                ? "platform-indicator codeforces-indicator"
                                : "platform-indicator leetcode-indicator"
                        }
                    ></span>

                    <h3>{title}</h3>

                </div>

                <span className="platform-contest-count">
                    {contests.length}
                </span>

            </div>

            <div className="platform-contest-list">

                {contests.length === 0 ? (
                    <div className="platform-empty">
                        {recent
                            ? `No recent ${title} contests.`
                            : `No upcoming ${title} contests.`}
                    </div>
                ) : (
                    contests.map((contest) => (
                        <ContestCard
                            key={`${contest.platform}-${contest.id}`}
                            contest={contest}
                            recent={recent}
                        />
                    ))
                )}

            </div>

        </div>
    );
}

export default ContestList;