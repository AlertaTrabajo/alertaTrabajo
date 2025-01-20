export interface Article {
  _id:        string;
  title:      string;
  category:   string;
  content:    string;
  imgUrl:     string;
  videoUrl:   string;
  date:       Date;
  status:     string;
  importance: number;
  tags:       string[];
  views:      number;
  slug:       string;
  __v:        number;
}
