require("dotenv").config();
const mongoose = require("mongoose");

async function fix() {
  await mongoose.connect(process.env.MONGODB_URI);

  const result = await mongoose.connection.collection("submissions").updateMany(
    {
      user: new mongoose.Types.ObjectId("6a5bbb71314660edbff29fdd"),
    },
    {
      $set: {
        user: new mongoose.Types.ObjectId("6a5cc79b3e8517d6c61e1b69"),
      },
    }
  );

  console.log(result);

  await mongoose.disconnect();
}

fix().catch(console.error);