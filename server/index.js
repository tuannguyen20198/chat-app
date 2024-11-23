const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoute = require("./Routes/userRoute");
const chatRoute = require("./Routes/chatRoute");
const messageRoute = require("./Routes/messageRoute");
const app = express();
require("dotenv").config();

app.use(express.json());
app.use(cors());
app.use("/api/users", userRoute);
app.use("/api/chats", chatRoute);
app.use("/api/messages", messageRoute);
app.get("/", (req, res) => {
  console.log(req.body);
  res.send("Hello World");
});

const PORT = process.env.PORT || 3000;
const uri = process.env.ATLAS_URI;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log("MongoDB connection established");
}).catch((error) => {
  console.log("MongoDB connection fail:", error.message);
});

