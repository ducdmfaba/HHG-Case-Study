import { InfoPagination, PaginationResult } from '../types/Pagination';
import { InfoEmployee } from '../types/Employee';

export const paginateList = (
  listItems: InfoEmployee[],
  infoPagination: InfoPagination,
): PaginationResult<InfoEmployee> => {
  const { page, limit } = infoPagination;
  const positionCurrentItem = (page - 1) * limit;
  const totalItems = listItems.length;
  const lastPage = Math.round(totalItems / limit);

  const data = listItems.slice(
    positionCurrentItem,
    positionCurrentItem + limit,
  );
  return {
    data,
    lastPage,
  };
};
