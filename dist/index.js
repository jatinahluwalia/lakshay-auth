"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var dotenv_1 = require("dotenv");
var db_js_1 = require("./config/db.js");
var user_routes_js_1 = require("./routes/user.routes.js");
var cors_1 = require("cors");
dotenv_1.default.config();
var app = (0, express_1.default)();
app.use((0, cors_1.default)({ origin: true }));
app.use("/api/user", user_routes_js_1.default);
(0, db_js_1.default)();
var PORT = process.env.PORT || 4000;
app.get("/", function (_req, res) {
    res.json("Working");
});
app.listen(PORT, function () {
    console.log("Listening to port ".concat(PORT));
});
