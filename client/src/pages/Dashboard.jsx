import { useEffect, useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import Leaderboard from "../components/Leaderboard/Leaderboard";
import { getDashboard } from "../services/dashboard.service";

function Dashboard() {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  const fetchDashboard = async () => {
  try {
    const response = await getDashboard();

    console.log("Dashboard API Response:", response);
console.log("Dashboard Data:", response.data);
console.log("Dashboard JSON:", JSON.stringify(response.data, null, 2));

    setDashboard(response.data);
  } catch (error) {
    console.error("Dashboard Error:", error);
  } finally {
    setLoading(false);
  }
};

  fetchDashboard();
}, []);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
  <>
    <Navbar />
    <div style={{ padding: "30px" }}>
      <pre>{JSON.stringify(dashboard, null, 2)}</pre>
    </div>
  </>
);
}

export default Dashboard;