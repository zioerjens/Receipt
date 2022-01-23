import {Article} from './article';

export interface Receipt {
  id: number;
  name: string;
  user: string;
  articles: Article[];
}
