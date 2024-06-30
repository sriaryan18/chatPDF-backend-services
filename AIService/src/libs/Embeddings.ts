import type { OpenAIEmbeddings } from "@langchain/openai";

export type AICLients = "openai";

export class Embeddings {
  public client: OpenAIEmbeddings;
  constructor(clientInst: OpenAIEmbeddings) {
    this.client = clientInst;
  }
  public static getAIClient = async (client: AICLients) => {
    let clientInst: OpenAIEmbeddings | null = null;
    switch (client) {
      case "openai": {
        const importedItem = await import("@langchain/openai");
        clientInst = new importedItem.OpenAIEmbeddings({
            apiKey: process.env.OPENAI_API_KEY,
            modelName:process.env.OPENAI_MODEL_KEY!,
            dimensions:1024
        });
        break;
      }
      default: {
        throw new Error("Can not create client with name " + client);
      }
    }
    return new Embeddings(clientInst);
  };

  embedDocuments = async (documents: string) => {
    const res = await this.client.embedDocuments([documents]);
    // console.log('I am embedding',res)
    return res;
  };
}
