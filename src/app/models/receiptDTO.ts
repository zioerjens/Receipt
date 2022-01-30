import {ArticleDTO} from './articleDTO';

export class ReceiptDTO {
  id?: number;
  name: string;
  user?: string;
  articles?: ArticleDTO[];

  constructor(name, articles) {
    this.name = name;
    this.articles = articles;
  }
}
