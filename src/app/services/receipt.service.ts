import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {ReceiptDTO} from '../models/receiptDTO';

@Injectable({
  providedIn: 'root'
})
export class ReceiptService {

  readonly BASE_URL = environment.BACKEND_URL + '/receipt';

  constructor(private http: HttpClient) {}

  create(receipt: ReceiptDTO): void {
    this.http.post<any>(this.BASE_URL, receipt).subscribe(next => {});
  }

  update(receipt: ReceiptDTO): void {
    const receiptJSON = JSON.stringify(receipt);
    this.http.put<any>(this.BASE_URL, receiptJSON).subscribe(next => {});
  }
}
