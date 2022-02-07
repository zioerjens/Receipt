import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {ReceiptDTO} from '../models/receiptDTO';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReceiptService {

  readonly BASE_URL = environment.BACKEND_URL + '/receipt';

  constructor(private http: HttpClient) {}

  create(receipt: ReceiptDTO): Observable<ReceiptDTO> {
    console.log(receipt);
    return this.http.post<any>(this.BASE_URL, receipt);
  }

  update(receipt: ReceiptDTO): Observable<ReceiptDTO> {
    return this.http.put<any>(this.BASE_URL, receipt);
  }

  getAll(): Observable<ReceiptDTO[]> {
    return this.http.get<any>(this.BASE_URL + '/all');
  }
}
