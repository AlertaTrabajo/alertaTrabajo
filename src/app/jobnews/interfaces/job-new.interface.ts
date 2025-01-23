export interface JobNew {
  _id:        string;
  title:      string;
  subtitle:   string;
  category:   string;
  author:     string;
  content:    string;
  imgUrl:     string;
  videoUrl:   string;
  date:       Date;
  status:     string;
  jobNewType: string;
  tags:       string[];
  views:      number;
  slug:       string;
  createdAt:  Date;
  updatedAt:  Date;
  __v:        number;
}
