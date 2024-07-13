import { EachMessagePayload } from "kafkajs";
import S3 from "../libs/S3";
import { DocumentLoader } from "../libs/DocumentLoader";
import { Embeddings } from "../libs/Embeddings";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { PineConeClass } from "../libs/Pinecone";

const createNewChat = async (documentId: string) => {
  console.log(
    "I am document ID at documentProcessor",
    JSON.stringify({
      documentId,
    })
  );
  try {
    const res = await fetch(
      `${process.env.CHAT_SERVICE_URL!}/chat/status/create`,
      {
        headers: {
          'Content-Type': 'application/json'  
      },
        method: "post",
        body: JSON.stringify({
          documentId,
        }),
      }
    );
    if (res.status === 200) return true;
    return false;
  } catch (e) {
    console.log(e);
    return false;
  }
};

export const handleKafkaEvent = async (payload: EachMessagePayload) => {
  console.log(payload.message.value?.toString(), "DOC ID");
  // const docPath = await S3.downloadDocument(
  //   payload.message.value?.toString()!,
  //   `${process.env.DOWNLOAD_PATH}${payload.message.value?.toString()!}.pdf`
  // );

  // DEV
  const docPath = `/Users/kuliza-1004/personal/saasReadPDF/services/documentProcessor/downloadedFiles/9ff5ac1d-a646-4aba-8440-681d0634a599.pdf`;

  if (docPath) {
    const documentLoader = await DocumentLoader.initializaLoader(
      "pdfloader",
      docPath
    );
    const docs = await documentLoader.load();
    // const embeddings = await Embeddings.getAIClient("openai");
    const textSplitter = new RecursiveCharacterTextSplitter({
      chunkSize: 1000,
      chunkOverlap: 200,
    });
    const splittedText = await textSplitter.splitDocuments(docs);
    // console.log("I am splitted text",splittedText);
    // TODO: here namespce should be based on something user/documentId
    // new PineConeClass().storeDocs(
    //   splittedText,
    //   embeddings.client,
    //   "testNamespace"
    // );

    const chatCreated = await createNewChat(payload.message.value?.toString()!); // TODO: this should be based on something user/documentId
  }
  return new Promise<void>((resolve) => resolve());
};
