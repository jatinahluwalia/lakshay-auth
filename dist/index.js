const express = require("express");
const app = express();

app.get("/", (_req, res) => {
  res.json("Working");
});

app.listen(4000);

module.exports = app;
