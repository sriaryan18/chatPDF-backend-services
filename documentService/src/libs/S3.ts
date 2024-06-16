import {
  S3Client,
  GetObjectCommand,
  PutObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

class S3 {
  private accessId = process.env.S3_ACCESS_ID;
  private accessToken = process.env.S3_ACCESS_TOKEN;
  private accountId = process.env.S3_ACCOUNT_ID;
  private bucketName = process.env.S3_BUCKET_NAME;
  public S3: S3Client | null = null;
  constructor() {
    // console.log("S3_ACCESS_ID:", this.accessId);
    // console.log("S3_ACCESS_TOKEN:", this.accessToken);
    console.log("S3_ACCOUNT_ID:", this.accountId);
    // console.log("S3_BUCKET_NAME:", this.bucketName);
    if (this.accessId && this.accessToken) {
      this.S3 = new S3Client({
        region: "auto",
        endpoint: `https://${this.accountId}.r2.cloudflarestorage.com`,

        credentials: {
          accessKeyId: this.accessId,
          secretAccessKey: this.accessToken,
        },
      });
    }
  }

  getSignedUrl_put = async (identifier: string, metaData?: object) => {
    if (this.S3) {
      const signedUrl = await getSignedUrl(
        this.S3,
        new PutObjectCommand({
          Bucket: this.bucketName,
          Key: identifier,
          ACL: "public-read-write",
          ...(metaData ?? { Metadata: metaData }),
        }),

        { expiresIn: 3600 }
      );
      return signedUrl;
    }
  };
}

export default new S3();
