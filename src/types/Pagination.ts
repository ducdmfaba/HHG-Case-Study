export interface InfoPagination {
  page: number;
  limit: number;
}

export interface PaginationResult<T> {
  data: T[];
  lastPage: number;
}
