const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

require("dotenv").config();

// Create express app
const app = express();

// Apply middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Routes
app.get("/", (_, res) => {
  res.send("Hello world");
});

// Application Port
const port = process.env.APP_PORT || 8000;
app.listen(port, () => {
  console.log(`Server is running on ${port} port`);
});
