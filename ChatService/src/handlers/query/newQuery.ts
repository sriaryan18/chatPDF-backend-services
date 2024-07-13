import { Request, Response } from "express";

export const handleNewQuery = async (req: Request, res: Response) => {
  const { message, documentId } = req.body;
  if (!message || !documentId) return null;
  try {
    const response = await fetch(process.env.AI_SERVICE_URL!, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        namespace: documentId,
        query: message,
      }),
    });
    console.log(
      "=========================\n Response from AI : ",
      response.body
    );
    if (response.ok) {
      return response;
    }
  } catch (e) {
    console.error("Error at Ai service response", e);
    return null;
  }
};
