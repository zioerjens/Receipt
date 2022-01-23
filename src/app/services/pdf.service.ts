import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PdfService {

  readonly BASE_URL = environment.BACKEND_URL + '/pdf';

  constructor(private http: HttpClient) {}

  getAllNames(): Observable<JSON> {
    return this.http.get<JSON>(this.BASE_URL + '/all');
  }

  getByName(name: string): Observable<Blob> {
    let headers = new HttpHeaders();
    const url = this.BASE_URL + '/' + name;
    headers = headers.set('Accept', 'application/pdf');
    return this.http.get(url, { headers, responseType: 'blob' });
  }
}
