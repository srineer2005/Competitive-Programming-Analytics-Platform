require("dotenv").config();
const mongoose = require("mongoose");

mongoose.set("debug", true);

async function testConnection() {
    try {
        console.log(process.env.MONGO_URI);

        await mongoose.connect(process.env.MONGO_URI);

        console.log("✅ Connected Successfully");
        process.exit(0);
    } catch (error) {
        console.error("Name:", error.name);
        console.error("Message:", error.message);
        console.error("Cause:", error.cause);
        console.error("Reason:", error.reason);

        process.exit(1);
    }
}

testConnection();