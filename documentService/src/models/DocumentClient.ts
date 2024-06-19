import { PrismaClient } from "@prisma/client";
import { UploadStatus } from "../types/status";

class Document {
  private prisma: PrismaClient;
  constructor() {
    this.prisma = new PrismaClient();
  }

  handleCleanup = () => {
    this.prisma.$disconnect();
  };

  addNewDocument = async (userName: string, title: string) => {
    try {
      // Find the user by userName
      const document = await this.prisma.document.findMany({
        where: { userId: userName },
      });

      // Create a new document associated with the found user
      const newDocument = await this.prisma.document.create({
        data: {
          title,
          userId: userName,
          status: UploadStatus.PENDING,
        },
      });

      console.log("New Document:", newDocument);
      return newDocument.id;
    } catch (error) {
      console.error("Error creating document:", error);
      throw error;
    } finally {
      this.handleCleanup();
    }
  };
  updateDocumentStatus = async (
    documentId: number,
    documentStatus: UploadStatus
  ) => {
    try {
      const typeCasted = Number(documentId);

      const document = await this.prisma.document.update({
        where: { id: typeCasted },
        data: {
          status: documentStatus ?? UploadStatus.FAILURE,
        },
      });
      console.log("I am document", document);
      return document.id;
    } catch (e) {
      console.error("Error in updating the document", e);
    } finally {
      this.handleCleanup();
    }
  };
}

export default new Document();
