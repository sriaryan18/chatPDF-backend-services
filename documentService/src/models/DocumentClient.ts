import { PrismaClient } from "@prisma/client";
import { UploadStatus } from "../types/status";

class Document {
  private static prisma: PrismaClient;

  public static getInstance(): PrismaClient {
    if (!Document.prisma) {
      Document.prisma = new PrismaClient();
      this.handleCleanup();
    }
    return Document.prisma;
  }
  private static handleCleanup = () => {
    const cleanup = async () => {
      if (Document.prisma) {
        await Document.prisma.$disconnect();
      }
    };
    process.on("SIGINT", cleanup);
    process.on("SIGTERM", cleanup);
    process.on("exit", cleanup);
  };

  addNewDocument = async (userName: string, title: string) => {
    try {
      // Find the user by userName
      const document = await Document.prisma.document.findMany({
        where: { userID: userName },
      });

      // Create a new document associated with the found user
      const newDocument = await Document.prisma.document.create({
        data: {
          title,
          userID: userName,
          status: UploadStatus.PENDING,
        },
      });

      console.log("New Document:", newDocument);
      return newDocument;
    } catch (error) {
      console.error("Error creating document:", error);
      throw error;
    }
  };
  updateDocumentStatus = async (documentId:number) => {
    const document = await Document.prisma.document.update({
      where:{id:documentId},
      data:{
        status:UploadStatus.SUCCESS
      }
    })
  }
}

export default Document.getInstance();
