import { PineconeStore } from "@langchain/pinecone";
import { Pinecone } from "@pinecone-database/pinecone";
import { Document } from "@langchain/core/documents";
import { OpenAIEmbeddings } from "@langchain/openai";
export class PineConeClass {
  private pineConeInst: Pinecone | undefined;
  public pineconeIdx;
  constructor() {
    this.pineConeInst = new Pinecone({
      apiKey: process.env.PINECONE_API_KEY!,
    });
    this.pineconeIdx = this.pineConeInst.Index(process.env.PINECONE_INDEX!);
  }

  storeDocs = async (
    documents: Document<Record<string, any>>[],
    embedingClient: OpenAIEmbeddings,
    namespace: string
  ) => {
    await PineconeStore.fromDocuments(documents, embedingClient, {
      maxConcurrency: 2,
      namespace,
      pineconeIndex: this.pineconeIdx,
    });
  };
}
