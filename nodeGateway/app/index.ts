import express, { Express, Request, Response } from "express";
import { handleAuth } from "./middleware/authorization";
import cors from "cors";
require("dotenv").config();

const app: Express = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(handleAuth);
debugger;
app.use("/**", (req: Request, res: Response) => {});

app.listen(process.env.PORT, () =>
  console.log("Gateway started at ", process.env.PORT)
);
