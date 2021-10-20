interface ISendMailTemplateContextData {
  [name: string]: unknown;
}

export interface ISendMailDTO {
  from?: string;
  to: string | string[];
  subject: string;
  data: ISendMailTemplateContextData;
  template: string;
}
