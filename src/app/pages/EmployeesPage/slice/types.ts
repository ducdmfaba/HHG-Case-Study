/* --- STATE --- */
import { InfoEmployee } from 'types/Employee';
import { ApiError } from 'types/Api';
import { InfoPagination, PaginationResult } from 'types/Pagination';

export interface EmployeeState {
  employees: InfoEmployee[];
  error: ApiError | null;
  infoPagination: InfoPagination;
  paginationResult: PaginationResult<InfoEmployee>;
}
