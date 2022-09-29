require("dotenv").config();
const dbConnection = require("./database/confiq/db");

const userRoutes = require("./database/routes/userRoutes");
const chatRoutes = require("./database/routes/chatRoutes");
const path = require("path");

const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;
dbConnection();

// ------> Middleware
app.use(cors());
app.use(express.json());

app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);

app.get("/", (req, res) => {
  res.send("Instant Chat Messaging App is running");
});

app.listen(port, () => {
  console.log(`Instant Chat Messaging App is running ${port}`);
});
