const express = require("express");
const cors = require("cors");
const errorHandler = require("./middleware/error.middleware");
const codeforcesRoutes = require("./routes/cp/codeforces.routes");
const leetcodeRoutes = require("./routes/cp/leetcode.routes");
const codechefRoutes = require("./routes/cp/codechef.routes");
const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");
const dashboardRoutes = require("./routes/dashboard.routes");
const app = express();

app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true,
    })
);

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello World!");
});
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/cp/codeforces", codeforcesRoutes);
app.use("/api/cp/leetcode", leetcodeRoutes);
app.use("/api/cp/codechef", codechefRoutes);

// Keep this as the LAST middleware
app.use(errorHandler);

module.exports = app;