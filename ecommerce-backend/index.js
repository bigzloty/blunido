const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const cors = require("cors");

const auth = require("./routes/auth");
const app = express();
const PORT = process.env.PORT;
const URI = process.env.MONGO_URI;

const connectToDatabase = async () => {
  try {
    await mongoose.connect(URI);
    console.log("Connected To DataBase");
  } catch (error) {
    console.log("Unable To Connect To Db");
  }
};

app.use(
  cors({
    origin: "*", 
  })
);

app.use(express.json())

app.use("/api/auth", auth);

app.listen(PORT, async () => {
  await connectToDatabase();
  console.log(`Server Started Running at Port ${PORT}`);
});
