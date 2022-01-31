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
      return this.dataSource
        .filter(a => !a.deleted)
        .map(m => m.total)
        .reduce((previousValue, currentValue) => previousValue + currentValue, 0);
    }
    return null;
  }

  toggleArticleDeleted(article: ArticleDTO): void {
    article.deleted = !article.deleted;
    this.articleService.update(article).subscribe(next => alert('successfully saved')); // TODO MAKE THIS NICE
  }
}
