import express from "express";
import dotenv from "dotenv";
import connectToDB from "./config/db.js";
import userRouter from "./routes/user.routes.js";
import cors from "cors";

dotenv.config();
const app = express();
app.use(cors());
app.use("/api", userRouter);

const PORT = process.env.PORT || 4000;

connectToDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Listening to port ${PORT}`);
  });
});
app.get("/", (_req, res) => {
  res.json("Working");
});

export default app;
