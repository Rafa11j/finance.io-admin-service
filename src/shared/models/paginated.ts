export interface IPaginated<T = unknown> {
  data: T[];
  total_elements: number;
  page: number;
  elements_in_page: number;
  elements_per_page: number;
  total_pages: number;
  first_page: boolean;
  last_page: boolean;
}

export interface IPaginatedParams {
  user_id: string;
  page: number;
  size: number;
}
