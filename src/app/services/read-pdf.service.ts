import {Injectable} from '@angular/core';
import {from, Observable} from 'rxjs';

declare let PDFJS: any;

@Injectable()
export class ReadPdfService {

  constructor() {
  }


  BASE64_MARKER = ';base64,';

  readPdf(file): Observable<any> {
    return from(this.getBase64(file).then(data => this.convertDataURIToBinary(data)));
  }

  getBase64(file): Promise<any> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }

  private convertDataURIToBinary(dataURI): any {

    const base64Index = dataURI.indexOf(this.BASE64_MARKER) + this.BASE64_MARKER.length;
    const base64 = dataURI.substring(base64Index);
    const raw = window.atob(base64);
    const rawLength = raw.length;
    const array = new Uint8Array(new ArrayBuffer(rawLength));

    for (let i = 0; i < rawLength; i++) {
      array[i] = raw.charCodeAt(i);
    }
    return this.pdfAsArray(array);

  }

  private pdfAsArray(pdfAsArray): any {
    PDFJS.workerSrc = '';

    return PDFJS.getDocument(pdfAsArray).promise.then((pdf) => {

      const pdfDocument = pdf;
      // Create an array that will contain our promises
      const pagesPromises = [];

      for (let i = 0; i < pdf.pdfInfo.numPages; i++) {
        // Required to prevent that i is always the total of pages
        ((pageNumber) => {
          // Store the promise of getPageText that returns the text of a page
          pagesPromises.push(this.getPageText(pageNumber, pdfDocument));
        })(i + 1);
      }

      return Promise.all(pagesPromises);

    }, (reason) => {
      // PDF loading error
      console.error(reason);
    });
  }

  private getPageText(pageNum, PDFDocumentInstance): Promise<any> {
    // Return a Promise that is solved once the text of the page is retrieven
    return new Promise((resolve, reject) => {
      PDFDocumentInstance.getPage(pageNum).then((pdfPage) => {
        // The main trick to obtain the text of the PDF page, use the getTextContent method
        pdfPage.getTextContent().then((textContent) => {
          const textItems = textContent.items;
          console.log(textItems);
          let finalString = '';

          // Concatenate the string of the item to the final string
          for (const item of textItems) {
            finalString += item.str + '__';
          }

          // Solve promise with the text retrieven from the page
          resolve(finalString);
        });
      });
    });
  }
}
