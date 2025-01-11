export interface Article {
  _id: string;
  title: string;
  content: string;
  category: string;
  imgUrl: string;
  videoUrl?: string;
  date: string;
  status: string;
  importance: number;
  tags: string[];
  slug: string;
  views: number;
}

// Versión simplificada para el listado
export interface SimpleArticle {
  _id: string;
  title: string;
  imgUrl: string;
  slug: string;
  description?: string;
  tags?: string[];
}

