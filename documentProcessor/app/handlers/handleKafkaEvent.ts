import { EachMessagePayload } from "kafkajs";
import S3 from "../libs/S3";
import { DocumentLoader } from "../libs/DocumentLoader";
import { Embeddings } from "../libs/Embeddings";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { PineConeClass } from "../libs/Pinecone";
export const handleKafkaEvent = async (payload: EachMessagePayload) => {
  console.log(payload.message.value?.toString(), "DOC ID");
  const docPath = await S3.downloadDocument(
    payload.message.value?.toString()!,
    `${process.env.DOWNLOAD_PATH}${payload.message.value?.toString()!}.pdf`
  );
  if(docPath){
    const documentLoader = await DocumentLoader.initializaLoader('pdfloader',docPath);
    const docs = await documentLoader.load();
    const embeddings = await Embeddings.getAIClient('openai');
    const textSplitter = new RecursiveCharacterTextSplitter({ chunkSize: 1000,chunkOverlap:200 });
    const splittedText = await textSplitter.splitDocuments(docs);
    // console.log("I am splitted text",splittedText);
    new PineConeClass().storeDocs(splittedText,embeddings.client,'testNamespace');
    // splittedText.map(text => {
    //     embeddings.embedDocuments(text.pageContent)
    // })
  }
  return new Promise<void>((resolve) => resolve());
};
