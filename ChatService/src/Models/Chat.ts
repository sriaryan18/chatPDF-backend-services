import mongoose, { Schema } from "mongoose";

const messageSchema = new Schema({
    source: { type: String, required: true },
    content: { type: String, required: true },
    createdAt: { type: Date, required: true, default: Date.now }
  }, {
    _id: false  
  });



const chatSchema = new Schema({
    _id: { type: Schema.Types.ObjectId, default: () => new mongoose.Types.ObjectId() },
    documentId: { type: String, required: true },
    messages: [messageSchema], 
    status: { type: String, required: true },
    user: { type: String, required: false }
  }, {
    collection: 'chats', 
    timestamps: true    
  })




export const Chat = mongoose.model('Chat',chatSchema)

