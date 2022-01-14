import {Component, Input, OnInit} from '@angular/core';
import {ReceiptArticle} from '../../models/receipt-article';

@Component({
  selector: 'app-receipt-table',
  templateUrl: './receipt-table.component.html',
  styleUrls: ['./receipt-table.component.scss']
})
export class ReceiptTableComponent implements OnInit {

  @Input()
  dataSource: ReceiptArticle[];

  displayedColumns: string[] = ['name', 'quantity', 'articlePrice', 'reduced', 'total'];

  constructor() {
  }

  ngOnInit(): void {
  }

  getTotal(): number {
    if (this.dataSource) {
      return this.dataSource.map(m => m.total).reduce((previousValue, currentValue) => previousValue + currentValue, 0);
    }
    return null;
  }
}
