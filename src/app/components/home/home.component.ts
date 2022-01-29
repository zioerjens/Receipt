import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../../services/authentication.service';
import {ParsePdfTextService} from '../../services/parse-pdf-text.service';
import {PdfService} from '../../services/pdf.service';
import {first} from 'rxjs/operators';
import {ReceiptService} from '../../services/receipt.service';
import {ReceiptDTO} from '../../models/receiptDTO';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  receipt = {
    name: 'Coop Name',
    user: 'Sven',
    articles: [{
      name: 'ArticleName',
      quantity: 2,
      price: 3.2,
      reduced : 1.1,
      total: 2.1
    }]
  } as ReceiptDTO;
  allPdfNames: string[] = [];

  constructor(
    private authenticationService: AuthenticationService,
    private parsePDF: ParsePdfTextService,
    private pdfService: PdfService,
    private receiptService: ReceiptService) {
  }

  ngOnInit(): void {
    this.initPdfNames();
  }

  initPdfNames(): void {
    this.pdfService.getAllNames().pipe(first()).subscribe(result => {
      Object.keys(result).forEach(key => {
        this.allPdfNames.push(result[key]);
      });
    });
  }

  signIn(): void {
    this.authenticationService.signIn();
  }

  fetchPdf(name: string): void {
    this.pdfService.getByName(name).pipe(first()).subscribe(result => {
      const file = new File([result], name);
      this.loadPdf(file);
    });
  }

  loadPdf(file: File): void {
    this.parsePDF.getFormattedData(file).subscribe(result => {
      this.receipt.articles = result;
    });
  }

  saveReceipt(receipt: ReceiptDTO): void {
    if (receipt.id == null) {
      this.receiptService.create(receipt);
    } else {
      this.receiptService.update(receipt);
    }
  }

  selectFile($event): void {
    this.loadPdf($event.target.files[0]);
  }
}
