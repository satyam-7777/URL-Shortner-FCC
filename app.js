const express = require("express");
const cors = require("cors");
const path = require("path");

const shortUrlRouter = require("./routes/urlShortenerRouter");

const app = express();

//global middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "client/build")));

app.use("/api/shorturl", shortUrlRouter);

app.all("/*splat", (req, res) => {
  res.status(404).json({
    status: "failed",
    message: `This ${req.method} ${req.originalUrl} route is not available on the server.`,
  });
});

// Global error middleware
app.use((err, req, res, next) => {
  res.status(err.statusCode || 500).json({
    error: err.message || "Something went wrong",
  });
});

module.exports = app;
