export interface Article {
  id: number;
  name: string;
  quantity: number;
  articlePrice: number;
  reduced?: number;
  total: number;
}
