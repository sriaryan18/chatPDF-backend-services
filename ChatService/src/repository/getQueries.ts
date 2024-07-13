import { Chat } from "../Models/Chat";

export const getAllChats = async  (chatModel :typeof Chat, username:string) => {
    const chats = await chatModel.find(
        {username:username}
    )
    return chats;
}

export const getChatsById = async (chatModel:typeof Chat,documentId:string) => {
    const chats = await chatModel.find({
        documentId
    });
    return chats;
}