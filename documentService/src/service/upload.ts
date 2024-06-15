import { Request, Response } from "express";
import S3 from "../libs/S3";
export default (req: Request, res: Response) => {
  console.log("i am s3 ", S3.getSignedUrl_put("testing2"), {
    test: "meta data",
  });
  res.send("Service tested");
};
