import { Request,Response } from "express"
import { Embeddings } from "../libs/Embeddings";
import pineConeInstance  from "../libs/Pinecone";

interface RequestBody  {
    namespace:string,
    query:string
}

/**
 * The sequence of steps followed by this fn:
 * get the answer of the query 
 * also if cache the result such that in case similar query is asked do not go 
 * to open ai simply return the response from the cache
 */


export default async  (req:Request,res:Response) => {
    const body = req?.body as RequestBody;
     const {namespace,query} = body;
     if(!namespace) res.status(401).send('Bad request no namespace received');
     if(!query) res.status(401).send('Bad request no query received');

    const aiClient = await Embeddings.getAIClient('openai');
    const queryRes = pineConeInstance.getQueryDocs(query,namespace,aiClient.client)
    res.status(200).send(queryRes);
    

}