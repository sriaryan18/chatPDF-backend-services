import { EachMessagePayload } from "kafkajs";
import S3 from "../libs/S3";

export const handleKafkaEvent = async (payload: EachMessagePayload) => {
  console.log(payload.message.value?.toString(), "DOC ID");
  const getDocUrl = await S3.downloadDocument(
    payload.message.value?.toString()!,
    `${process.env.DOWNLOAD_PATH}${payload.message.value?.toString()!}.pdf`
  );
  return new Promise<void>((resolve) => resolve());
};
