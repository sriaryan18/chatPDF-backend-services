import { EachMessagePayload } from "kafkajs";
import S3 from "../libs/S3";

export  const  handleKafkaEvent = async (payload:EachMessagePayload) => {
    console.log(payload.message.value?.toString(),'hi srdndscnv','s3');
    await S3.downloadDocument('testing');
    return new Promise<void>((resolve) => resolve());
}