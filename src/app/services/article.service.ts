import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {ArticleDTO} from '../models/articleDTO';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  readonly BASE_URL = environment.BACKEND_URL + '/article';

  constructor(private http: HttpClient) {}

  update(article: ArticleDTO): Observable<ArticleDTO> {
    return this.http.put<any>(this.BASE_URL, article);
  }

}
