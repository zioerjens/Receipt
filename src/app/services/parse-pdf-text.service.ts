import {Injectable} from '@angular/core';
import {ParsePdfService} from './parse-pdf.service';
import {ArticleDTO} from '../models/articleDTO';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {ReceiptDTO} from '../models/receiptDTO';

@Injectable()
export class ParsePdfTextService {

  constructor(private readPdf: ParsePdfService) {
  }

  getFormattedData(file): Observable<ReceiptDTO> {
    return this.readPdf.readPdf(file).pipe(
      map(text => {
        return new ReceiptDTO(file.name, this.getRelevantParts(text.reduce((a, b) => a + b, '')));
      })
    );
  }

  getRelevantParts(text: string): ArticleDTO[] {
    text = 'Artikel' + text.split('Artikel')[1].split('Total CHF')[0];
    return this.parseObjects(text.split('__'));
  }

  parseObjects(elements: string[]): ArticleDTO[] {
    const results = [];
    elements = elements.filter(e => e !== 'A');

    let missingCellOffset = 0;
    for (let j = 1; j < elements.length; j++) {

      let reductionWithEmptyCell = 0;
      const i = j * 6;
      if (!this.hasNext(elements, i, missingCellOffset)) {
        break;
      }
      const o: ArticleDTO = {
        id: j,
        name: elements[i + missingCellOffset],
        quantity: parseFloat(elements[i + 1 + missingCellOffset]),
        price: parseFloat(elements[i + 2 + missingCellOffset]),
        total: 0
      };
      // Produkt ist keine Aktion, darum fehlt eine Zelle, darum wird missingCellOffset dekrementiert
      if (elements[i + 2 + missingCellOffset] === elements[i + 3 + missingCellOffset]) {
        missingCellOffset--;
      } else {
        // Produkt hat einen Aktionspreis
        if (elements[i + 3 + missingCellOffset] === elements[i + 4 + missingCellOffset]) {
          o.reduced = parseFloat(elements[i + 3 + missingCellOffset]);
        } else {
          // Wenn das Produkt eine Aktion ist, aber kein Aktionspreis vorhanden ist
          reductionWithEmptyCell = 1;
          missingCellOffset--;
        }

      }
      o.total = parseFloat(elements[i + 3 + missingCellOffset + reductionWithEmptyCell]);
      // Wenn die letzte Spalte (Zusatz) leer ist
      if (elements[i + 5 + missingCellOffset] !== '0') {
        missingCellOffset--;
      }
      results.push(o);
    }
    return results;
  }

  hasNext(elements, i, missingCellOffset): boolean {
    return !(elements[i + missingCellOffset] === undefined ||
      elements[i + 1 + missingCellOffset] === undefined ||
      elements[i + 2 + missingCellOffset] === undefined ||
      elements[i + 3 + missingCellOffset] === undefined ||
      elements[i + 4 + missingCellOffset] === undefined);
  }
}
