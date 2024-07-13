import { getAllChats, getChatsById } from "../../repository/getQueries";
import { Chat as chatModel } from "../../Models/Chat";
import { Request, Response } from "express";

export const getAllQueries = async (req: Request, res: Response) => {
  try {
    const userDetails = {
      username: "aryan",
    };
    const allChats = await getAllChats(chatModel, userDetails.username);
    if (allChats.length) res.status(200).json(allChats);
    else res.status(400).send("No chat found ");
    return;
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const getQueryById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const chats = await getChatsById(chatModel, id);
    if (chats.length) {
      res.status(200).json(chats);
    } else {
      res.status(400).send("Chat not found");
    }
    return;
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Something went wrong" });
  }
};
