export interface ArticleApiResponse {
  _id:        string;
  title:      string;
  category:   Category;
  content:    string;
  imgUrl:     string;
  videoUrl:   string;
  date:       Date;
  status:     Status;
  importance: number;
  tags:       string[];
  views:      number;
  slug:       string;
}

export enum Category {
  VacationLeave = 'vacation_leave',
  LaborRights = 'labor_rights',
  HealthSafety = 'health_safety',
  LawsRegulations = 'laws_regulations',
  PracticalAdvice = 'practical_advice',
  Others = 'others'
}

export enum Status {
  Active = "active",
  Inactive = "inactive"
}
