const express = require("express");
const cors = require("cors");

const dashboardRoutes = require("./routes/dashboard.routes");
const customDashboardRoutes = require("./routes/customDashboard.routes");
const contestRoutes = require("./routes/contest.routes");
const userRoutes = require("./routes/user.routes");
const authRoutes = require("./routes/auth.routes");

const codeforcesRoutes = require("./routes/cp/codeforces.routes");
const leetcodeRoutes = require("./routes/cp/leetcode.routes");
const codechefRoutes = require("./routes/cp/codechef.routes");

const problemRoutes = require("./routes/problem.routes");
const dashboardInvitationRoutes = require("./routes/dashboardInvitation.routes");
const notificationRoutes = require("./routes/notification.routes");
const leaderboardRoutes = require("./routes/leaderboard.routes");
const profileRoutes = require("./routes/profile.routes");

const errorHandler = require("./middleware/error.middleware");

const app = express();

app.use(
    cors({
        origin: process.env.CLIENT_URL || "http://localhost:5173",
        credentials: true,
    })
);

app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "CP Analytics API is running",
    });
});

app.use("/api/dashboard", dashboardRoutes);
app.use("/api/custom-dashboards", customDashboardRoutes);
app.use("/api/contests", contestRoutes);
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

app.use("/api/cp/codeforces", codeforcesRoutes);
app.use("/api/cp/leetcode", leetcodeRoutes);
app.use("/api/cp/codechef", codechefRoutes);

app.use("/api/problems", problemRoutes);
app.use("/api/dashboard-invitations", dashboardInvitationRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/leaderboard", leaderboardRoutes);
app.use("/api/profile", profileRoutes);

app.use(errorHandler);

module.exports = app;