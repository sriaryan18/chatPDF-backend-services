import express from "express";
import { chatRoutes } from "./routes";

import mongoose from "mongoose";
mongoose
  .connect(process.env.DATABASE_URL!)
  .then(() => console.info("Database connected (mongoDB)"))
  .catch(() => console.log("Error in connecting with Database"));

const app = express();

app.use(express.json());
app.use(express.urlencoded());

app.use("/chat", chatRoutes);

app.listen(process.env.PORT, () =>
  console.log("Chat service started at ", process.env.PORT)
);
