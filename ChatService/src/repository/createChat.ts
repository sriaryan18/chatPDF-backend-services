import { Model } from "mongoose";
import type {Chat} from '../Models/Chat'
export const createChat = async  (ChatModel:typeof Chat, documentId:string, status:'Pending') => {
    const chat = await ChatModel.create({
        documentId,
        status
    });
    return chat;
    
}