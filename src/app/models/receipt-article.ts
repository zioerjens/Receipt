export interface ReceiptArticle {
  id: number;
  name: string;
  quantity: number;
  articlePrice: number;
  reduced?: number;
  total: number;
}
