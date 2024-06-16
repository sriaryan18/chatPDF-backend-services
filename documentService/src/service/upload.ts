import { Request, Response } from "express";
import S3 from "../libs/S3";
import {UploadStatus} from '../types/status'
export const handleUpload = async (req: Request, res: Response) => {
  // const userDetails = getUserDetails(req)

  const preSignedUrl = await S3.getSignedUrl_put("testuser");
  if (preSignedUrl) {
    res.json({ preSignedUrl }).status(200);
  }else{
    res.status(402).send({message:'Bad request'})
  }
};

export const handleStatusUpdate = (req:Request,res:Response) => {
  const {status , documentId = null} = req.body;

  if(status === UploadStatus.SUCCESS){
    
  }else if(status === UploadStatus.FAILURE){

  }

}