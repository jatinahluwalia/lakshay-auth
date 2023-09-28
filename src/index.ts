import express from "express";
import dotenv from "dotenv";
import connectToDB from "./config/db.js";
import userRouter from "./routes/user.routes.js";
import cors from "cors";

dotenv.config();
const app = express();

app.use(cors({ origin: true }));
app.use("/api/user", userRouter);

connectToDB();

const PORT = process.env.PORT || 4000;

app.get("/", (_req, res) => {
  res.json("Working");
});

app.listen(PORT, () => {
  console.log(`Listening to port ${PORT}`);
});
