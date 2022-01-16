import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../../services/authentication.service';
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
    private apiService: AuthenticationService,
    private parsePDF: ParsePdfTextService) {
  }

  ngOnInit(): void {
  }

  signIn(): void {
    this.apiService.signIn();
  }

  checkLogin(): void {

  }

  initClient(): void {

  }

  selectFile($event): any {
    this.parsePDF.getFormattedData($event.target.files[0]).subscribe(result => {
      this.articles = result;
    });
  }


}
