import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReceiptService {

  readonly BASE_URL = environment.BACKEND_URL + '/receipt';

  constructor(private http: HttpClient) {}

  readonly receipt = {
    name: 'Coop Name',
    user: 'Sven',
    articles: [{
      name: 'ArticleName',
      quantity: 2,
      articlePrice: 3.2,
      reduced : 1.1,
      total: 2.1
    }]
  };

  createUpdate(Receipt?): void {
    this.http.post<any>(this.BASE_URL, this.receipt).subscribe(next => {});
    }
}
