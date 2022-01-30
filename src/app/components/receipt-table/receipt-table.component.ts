import {Component, Input} from '@angular/core';
import {ArticleDTO} from '../../models/articleDTO';
import {ArticleService} from '../../services/article.service';

@Component({
  selector: 'app-receipt-table',
  templateUrl: './receipt-table.component.html',
  styleUrls: ['./receipt-table.component.scss']
})
export class ReceiptTableComponent {

  @Input()
  dataSource: ArticleDTO[];

  displayedColumns: string[] = ['name', 'quantity', 'price', 'reduced', 'total', 'deleted'];

  constructor(private articleService: ArticleService) {
  }

  getTotal(): number {
    if (this.dataSource) {
      return this.dataSource.map(m => m.total).reduce((previousValue, currentValue) => previousValue + currentValue, 0);
    }
    return null;
  }

  removeArticle(article: ArticleDTO): void {
    article.deleted = true;
    this.articleService.update(article).subscribe(next => article = next); // TODO MAKE THIS SINNVOLL
  }
}
