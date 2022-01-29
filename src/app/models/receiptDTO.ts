import {ArticleDTO} from './articleDTO';

export interface ReceiptDTO {
  id?: number;
  name: string;
  user: string;
  total: number;
  articles?: ArticleDTO[];
}
