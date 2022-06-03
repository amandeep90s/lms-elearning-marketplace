const express = require("express");
const cors = require("cors");
const csrf = require("csurf");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const mongoose = require("mongoose");
const { readdirSync } = require("fs");

require("dotenv").config();

// Csrf protection
const csrfProtection = csrf({ cookie: true });

// Create express app
const app = express();

// Database connection
mongoose
  .connect(process.env.APP_MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("**DB connected**"))
  .catch((err) => console.log(`DB connection error => ${err}`));

// Apply middleware
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(morgan("dev"));

// Routes
readdirSync("./routes").map((r) => app.use("/api/", require(`./routes/${r}`)));

// Csrf
app.use(csrfProtection);

app.get("/api/csrf-token", (req, res) => {
  res.json({ csrfToken: req.csrfToken() });
});

// Application Port
const port = process.env.APP_PORT || 8000;
app.listen(port, () => {
  console.log(`Server is running on ${port} port`);
});
