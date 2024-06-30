import { PineconeStore } from "@langchain/pinecone";
import { Pinecone } from "@pinecone-database/pinecone";
import { OpenAIEmbeddings } from "@langchain/openai";
class PineConeClass {
  public static singletonInst : PineConeClass;
  private pineConeInst: Pinecone | undefined;
  public pineconeIdx;
  public vectorStore: PineconeStore | null = null;
  constructor() {
    this.pineConeInst = new Pinecone({
      apiKey: process.env.PINECONE_API_KEY!,
    });
    this.pineconeIdx = this.pineConeInst.Index(process.env.PINECONE_INDEX!);
  }
  public static  init() {
    if(!PineConeClass.singletonInst) {
      PineConeClass.singletonInst = new PineConeClass();
    } 
    return PineConeClass.singletonInst
    
  }
 

  getQueryDocs = async (
    query: string,
    namespace: string,
    embedingClient: OpenAIEmbeddings
  ) => {
    const vectorStore = await PineconeStore.fromExistingIndex(embedingClient, {
        pineconeIndex: this.pineconeIdx,
        namespace
    });
    const result = await vectorStore.similaritySearch(query,2);
    console.log('I am vector store',result,query);
    return result

  };
}

export default PineConeClass.init();
