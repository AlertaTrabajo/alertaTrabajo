import { Article } from "./article.interface";

export interface PaginatedArticles {
  articles: Article[];
  total: number;
  currentPage: number;
  totalPages: number;
}
