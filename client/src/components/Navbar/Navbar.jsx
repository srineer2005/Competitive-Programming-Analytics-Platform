import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "15px 40px",
        borderBottom: "1px solid #ccc",
      }}
    >
      <h2>CP Analytics</h2>

      <div style={{ display: "flex", gap: "25px" }}>
        <Link to="/dashboard">Home</Link>

        <Link to="/upcoming-contests">
          Upcoming Contests
        </Link>

        <Link to="/history">
          History
        </Link>

        <Link to="/performance">
          Performance
        </Link>

        <Link to="/custom-dashboard">
          Custom Dashboard
        </Link>
      </div>

      <div>
        <Link to="/profile">👤 Profile</Link>
      </div>
    </nav>
  );
}

export default Navbar;