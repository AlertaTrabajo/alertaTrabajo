export interface JobNewAPIResponse {
  _id:        string;
  title:      string;
  subtitle:   string;
  category:   JobNewCategory;
  author:     string;
  content:    string;
  date:       Date;
  status:     JobNewStatus;
  jobNewType: JobNewType;
  tags:       string[];
  views:      number;
  slug:       string;
  createdAt:  Date;
  updatedAt:  Date;
  imgUrl?:    string;
  videoUrl?:  string;
}


export enum JobNewCategory {
  LABOR_CONFLICTS = 'labor_conflicts', // Huelgas y conflictos laborales
  SALARIES = 'salaries', // Sueldos, pagas, aumentos
  ACCIDENTS = 'accidents', // Accidentes en el trabajo
  LEGAL_NEWS = 'legal_news', // Cambios en leyes laborales
  PUBLIC_JOBS = 'public_jobs', // Empleo público y oposiciones
  HEALTH_SAFETY = 'health_safety', // Salud y seguridad laboral
  SOCIAL_SECURITY = 'social_security', // Subsidios, pensiones, ayudas
  WORKER_RIGHTS = 'worker_rights', // Derechos laborales básicos
  DISMISSALS = 'dismissals', // Despidos, EREs, finiquitos
  WORK_LIFE = 'work_life', // Conciliación laboral y familiar
  NATIONAL_NEWS = 'national_news', // Noticias laborales generales
  OTHER = 'other' // Noticias misceláneas
}

export enum JobNewStatus {
  Active = "active",
  Inactive = "inactive"
}

export enum JobNewType {

  FEATURED = 'featured',
  GENERAL = 'general',
  MINOR = 'minor'
}
