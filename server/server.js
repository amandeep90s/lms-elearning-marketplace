const express = require("express");
const cors = require("cors");
const { readdirSync } = require("fs");
const morgan = require("morgan");

require("dotenv").config();

// Create express app
const app = express();

// Apply middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Routes
readdirSync("./routes").map((r) => app.use("/api/", require(`./routes/${r}`)));

// Application Port
const port = process.env.APP_PORT || 8000;
app.listen(port, () => {
  console.log(`Server is running on ${port} port`);
});
