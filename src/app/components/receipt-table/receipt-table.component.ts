import {Component, Input} from '@angular/core';
import {Article} from '../../models/article';

@Component({
  selector: 'app-receipt-table',
  templateUrl: './receipt-table.component.html',
  styleUrls: ['./receipt-table.component.scss']
})
export class ReceiptTableComponent {

  @Input()
  dataSource: Article[];

  displayedColumns: string[] = ['name', 'quantity', 'articlePrice', 'reduced', 'total'];

  getTotal(): number {
    if (this.dataSource) {
      return this.dataSource.map(m => m.total).reduce((previousValue, currentValue) => previousValue + currentValue, 0);
    }
    return null;
  }
}
