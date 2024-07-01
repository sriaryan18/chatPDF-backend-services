import { Request, Response } from "express";
import { Embeddings } from "../libs/Embeddings";
import pineConeInstance from "../libs/Pinecone";
import  { Document } from "@langchain/core/documents";
import {
  RunnableSequence,
  RunnablePassthrough,
} from "@langchain/core/runnables";
import { ChatPromptTemplate } from "@langchain/core/prompts";

import { ChatOpenAI } from "@langchain/openai";
import { StringOutputParser } from "@langchain/core/output_parsers";

interface RequestBody {
  namespace: string;
  query: string;
}

/**
 * The sequence of steps followed by this fn:
 * get the answer of the query
 * also if cache the result such that in case similar query is asked do not go
 * to open ai simply return the response from the cache
 */
const formatDocumentsAsString = (documents: Document[]) => {
  return documents.map((document) => document.pageContent).join("\n\n");
};

export default async (req: Request, res: Response) => {
  const body = req?.body as RequestBody;
  const { namespace, query } = body;
  if (!namespace) res.status(401).send("Bad request no namespace received");
  if (!query) res.status(401).send("Bad request no query received");
  const llm = new ChatOpenAI({ model: "gpt-3.5-turbo", temperature: 0 });
  const SYSTEM_TEMPLATE = `Use the following pieces of context to answer the question at the end.
        If you don't know the answer, just say that you don't know, don't try to make up an answer.
        ----------------
        {context}`;

  const prompt = ChatPromptTemplate.fromMessages([
    ["system", SYSTEM_TEMPLATE],
    ["human", "{question}"],
  ]);

  const aiClient = await Embeddings.getAIClient("openai");
  const retriever = await pineConeInstance.getRetriever(
    query,
    namespace,
    aiClient.client
  );
  const declarativeRagChain = await RunnableSequence.from([
    {
      context: retriever.pipe(formatDocumentsAsString),
      question: new RunnablePassthrough(),
    },
    prompt,
    llm,
    new StringOutputParser(),
  ]).invoke(query);
//   console.log('Hi ',declarativeRagChain)
  res.status(200).send(declarativeRagChain);
};
