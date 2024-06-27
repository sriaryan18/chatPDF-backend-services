import { Request, Response } from "express";
import S3 from "../libs/S3";
import { UploadStatus } from "../types/status";
import DocumentClient from "../models/DocumentClient";
import KafkaClient from "../libs/KafkaClient";




export const handleUpload = async (req: Request, res: Response) => {
  // const userDetails = getUserDetails(req)
  
    try{
      const documentId = await DocumentClient.addNewDocument(
        "testUser",
        "dummy title"
      );
      const preSignedUrl = await S3.getSignedUrl_put(documentId);
      res.json({ preSignedUrl, documentId }).status(200);
    
    }catch(e){
      res.status(402).send({ message: "Bad request" });
      throw e
    }
    
  
};

export const handleStatusUpdate = async (req: Request, res: Response) => {
  try {
    console.log("at status update", req.body);
    const { status, documentId = null } = req.body;
    if (status === UploadStatus.SUCCESS) {
      const id = await DocumentClient.updateDocumentStatus(documentId, status);
      if (id) {
        KafkaClient.getInstance().produceMessage({
          topic: process.env.KafkaTopic ?? "document",
          messages: [id.toString()],
        });
        res.status(200).json({ documentId: id });
      } else res.status(404).json({ message: "Document not found" });
    } else if (status === UploadStatus.FAILURE) {
    }
  } catch (e) {
    console.error("Error at handleStatus ", e);
    res.status(500).json("Something went wrong");
  }
};
