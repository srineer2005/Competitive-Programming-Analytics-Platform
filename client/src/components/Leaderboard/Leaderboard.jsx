function Leaderboard({ dashboard }) {
  const user = dashboard.user;
  const summary = dashboard.summary;

  return (
    <div style={{ marginTop: "40px" }}>
      <h2>🏆 Leaderboard</h2>

      <div
        style={{
          display: "flex",
          gap: "15px",
          margin: "20px 0",
          flexWrap: "wrap",
        }}
      >
        <input
          type="text"
          placeholder="Search User"
          style={{
            padding: "8px",
            width: "220px",
          }}
        />

        <select>
          <option>Country</option>
        </select>

        <select>
          <option>State</option>
        </select>

        <select>
          <option>University</option>
        </select>

        <select>
          <option>Custom Group</option>
        </select>
      </div>

      <table
        border="1"
        cellPadding="10"
        style={{
          width: "100%",
          borderCollapse: "collapse",
          textAlign: "center",
        }}
      >
        <thead>
          <tr>
            <th>Rank</th>
            <th>Name</th>
            <th>CF Rating</th>
            <th>LC Solved</th>
            <th>Total Solved</th>
            <th>Contests</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>1</td>

            <td>{user.name}</td>

            <td>{summary?.currentCodeforcesRating ?? 0}</td>

            <td>{dashboard.leetcode.profile?.totalSolved ?? 0}</td>

            <td>{summary?.totalSolved ?? 0}</td>

            <td>
  {(summary?.totalCodeforcesContests ?? 0) +
    (summary?.totalLeetCodeContests ?? 0)}
</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Leaderboard;