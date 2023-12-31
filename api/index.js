"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_js_1 = __importDefault(require("./config/db.js"));
const user_routes_js_1 = __importDefault(require("./routes/user.routes.js"));
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use("/api", user_routes_js_1.default);
const PORT = process.env.PORT || 4000;
(0, db_js_1.default)().then(() => {
    app.listen(PORT, () => {
        console.log(`Listening to port ${PORT}`);
    });
});
app.get("/", (_req, res) => {
    res.json("Working");
});
exports.default = app;
