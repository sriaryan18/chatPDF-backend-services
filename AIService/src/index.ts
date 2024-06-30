import express from "express";
import handleMessageRequest from "./handlers/handleMessageRequest";

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());



app.post('/chat',(req,res) => handleMessageRequest(req,res))

app.listen(process.env.PORT, () =>
  console.log("AI Service started at port", process.env.PORT)
);
