const express = require("express");
const errorHandler = require("./middleware/error.middleware");
const cpRoutes = require("./routes/cp.routes");
const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/cp", cpRoutes);

// Keep this as the LAST middleware
app.use(errorHandler);

module.exports = app;