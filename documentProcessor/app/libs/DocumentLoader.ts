import type { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
export type DocumentLoaderTypes = "pdfloader";


// this way multiple doc loader can be supported
export class DocumentLoader {
  private loader: PDFLoader | null  = null;

   constructor(loader:PDFLoader) {
    this.loader = loader
        
  }

  public static initializaLoader = async (loaderType:DocumentLoaderTypes,documentPath:string) => {
    let loader: PDFLoader | null  = null;
    switch (loaderType) {
        case 'pdfloader': {
         const items = await import('@langchain/community/document_loaders/fs/pdf');
         loader =  new items.PDFLoader(documentPath);
         break;
        }
        default: {
            throw new Error(`Unsupported loader type: ${loaderType}`);
          }
      }
      return new DocumentLoader(loader)
  }

  load = async () => {
    if (!this.loader) {
        throw new Error("Loader is not initialized.");
      }
      const docs = await this.loader.load();
      console.log('Document loaded ', docs, this.loader);
      return docs;
  };
}
