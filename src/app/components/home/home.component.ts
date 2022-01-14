import {Component, OnInit} from '@angular/core';
import {ApiService} from '../../services/api.service';
import {ParsePdfTextService} from '../../services/parse-pdf-text.service';
import {ReceiptArticle} from '../../models/receipt-article';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public articles: ReceiptArticle[];

  constructor(
    private apiService: ApiService,
    private parsePDF: ParsePdfTextService) {
  }

  ngOnInit(): void {
  }

  auth(): void {
    this.apiService.initGoogleOAuth();
  }

  selectFile($event): any {
    this.parsePDF.getFormattedData($event.target.files[0]).subscribe(result => {
      this.articles = result;
    });
  }


}
