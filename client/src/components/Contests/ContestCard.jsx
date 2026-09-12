import { useEffect, useState } from "react";

function ContestCard({ contest, recent = false }) {
  const [status, setStatus] = useState("");

  useEffect(() => {
    if (recent) {
      setStatus("COMPLETED");
      return;
    }

    const updateCountdown = () => {
      const now = new Date();
      const start = new Date(contest.startTime);
      const end = new Date(start.getTime() + contest.duration * 1000);

      if (now >= end) {
        setStatus("COMPLETED");
        return;
      }

      if (now >= start && now < end) {
        setStatus("LIVE");
        return;
      }

      const diff = start - now;

      const days = Math.floor(
        diff / (1000 * 60 * 60 * 24)
      );

      const hours = Math.floor(
        (diff % (1000 * 60 * 60 * 24)) /
          (1000 * 60 * 60)
      );

      const minutes = Math.floor(
        (diff % (1000 * 60 * 60)) /
          (1000 * 60)
      );

      let text = "Starts in ";

      if (days > 0) {
        text += `${days}d `;
      }

      if (hours > 0 || days > 0) {
        text += `${hours}h `;
      }

      text += `${minutes}m`;

      setStatus(text);
    };

    updateCountdown();

    const interval = setInterval(updateCountdown, 60000);

    return () => clearInterval(interval);
  }, [contest, recent]);

  const startDate = new Date(contest.startTime);

  const durationHours = Math.floor(
    contest.duration / 3600
  );

  const durationMinutes = Math.floor(
    (contest.duration % 3600) / 60
  );

  const formattedDate = startDate.toLocaleDateString(
    undefined,
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }
  );

  const formattedTime = startDate.toLocaleTimeString(
    undefined,
    {
      hour: "2-digit",
      minute: "2-digit",
    }
  );

  const platformClass =
    contest.platform.toLowerCase() === "codeforces"
      ? "platform-codeforces"
      : "platform-leetcode";

  const statusClass = recent
    ? "status-completed"
    : status === "LIVE"
      ? "status-live"
      : "status-upcoming";

  return (
    <article className="contest-card">
      <div className="contest-card-top">
        <span className={`contest-platform ${platformClass}`}>
          {contest.platform}
        </span>

        <span className={`contest-status ${statusClass}`}>
          <span className="status-dot"></span>
          {status}
        </span>
      </div>

      <div className="contest-card-content">
        <h3>{contest.name}</h3>

        <div className="contest-info">
          <div className="contest-info-item">
            <span className="info-icon">◷</span>
            <div>
              <span className="info-label">
                {recent ? "Held on" : "Starts"}
              </span>

              <span className="info-value">
                {formattedDate} · {formattedTime}
              </span>
            </div>
          </div>

          {contest.duration > 0 && (
            <div className="contest-info-item">
              <span className="info-icon">◴</span>
              <div>
                <span className="info-label">Duration</span>

                <span className="info-value">
                  {durationHours > 0 &&
                    `${durationHours}h `}

                  {durationMinutes > 0 &&
                    `${durationMinutes}m`}

                  {durationHours === 0 &&
                    durationMinutes === 0 &&
                    "< 1m"}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="contest-card-footer">
        {!recent && status !== "LIVE" && (
          <span className="contest-countdown">
            {status}
          </span>
        )}

        {status === "LIVE" && (
          <span className="contest-countdown live-text">
            Contest is live
          </span>
        )}

        {recent && (
          <span className="contest-countdown completed-text">
            Contest completed
          </span>
        )}

        <a
          href={contest.url}
          target="_blank"
          rel="noreferrer"
          className="contest-view-button"
        >
          View Contest
          <span>↗</span>
        </a>
      </div>
    </article>
  );
}

export default ContestCard;