import express from "express";
import dotenv from "dotenv";
import connectToDB from "./config/db.js";
import userRouter from "./routes/user.routes.js";
import cors from "cors";
dotenv.config();
var app = express();
app.use(cors({ origin: true }));
app.use("/api/user", userRouter);
connectToDB();
var PORT = process.env.PORT || 4000;
app.get("/", function (_req, res) {
    res.json("Working");
});
app.listen(PORT, function () {
    console.log("Listening to port ".concat(PORT));
});
