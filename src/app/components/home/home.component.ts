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
    name: '',
    user: '',
    articles: []
  } as ReceiptDTO;
  allReceipts: ReceiptDTO[] = [];

  constructor(
    private authenticationService: AuthenticationService,
    private parsePDF: ParsePdfTextService,
    private pdfService: PdfService,
    private receiptService: ReceiptService) {
  }

  ngOnInit(): void {
    this.fetchAllReceipts();
  }

  fetchAllReceipts(): void {
    this.receiptService.getAll().subscribe( result => {
      this.allReceipts.push(...result);
      this.downloadPdfsAndSave();
    });
  }

  loadReceipt(receipt: ReceiptDTO): void {
    this.receipt = receipt;
  }

  downloadPdfsAndSave(): void {
    this.pdfService.downloadFromMail().pipe(first()).subscribe(result => {
      result.forEach(pdfName => {
        this.pdfService.getByName(pdfName).pipe(first()).subscribe(pdfData => {
          const file = new File([pdfData], pdfName.slice(0, -4));
          this.parsePDF.getFormattedData(file).subscribe(receipt => {
            this.receiptService.create(receipt).pipe(first()).subscribe(savedReceipt => {
              this.allReceipts.push(savedReceipt);
            });
          });
        });
      });
    });
  }

  signIn(): void {
    this.authenticationService.signIn();
  }
}
