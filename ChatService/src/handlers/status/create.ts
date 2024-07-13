import { Request, Response } from "express";
import { createChat } from "../../repository/createChat";
import { Chat as chatModel } from "../../Models/Chat";

interface ICreateChat {
  documentId: string;
}

enum DocumentStatus {
  Pending = "Pending",
}

export const handleCreateChat = async (req: Request, res: Response) => {
  const body = req.body as ICreateChat;
  const { documentId } = body;
  console.log("I am body", req.body.documentId);
  if (!body) {
    return res.status(400).json({ message: "Bad Request" });
  }
  const chatdata = await createChat(
    chatModel,
    documentId,
    DocumentStatus.Pending
  );

  if (chatdata) {
    res.status(200).json({ message: "Chat created successfully", chatdata });
  } else {
    res.status(400).json({ message: "Invalid request" });
  }
};
