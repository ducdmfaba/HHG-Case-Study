import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { employeeSaga } from './saga';
import { EmployeeState } from './types';
import { ApiError, ApiResponse } from 'types/Api';
import { SIZE } from 'constants/pagination';
import { paginateList } from 'utils/pagination';
import { InfoAddEmployee, InfoEmployee } from 'types/Employee';
import { InfoPagination } from 'types/Pagination';

export const initialState: EmployeeState = {
  employees: [],
  error: null,
  infoPagination: {
    page: 1,
    limit: SIZE,
  },
  paginationResult: {
    data: [],
    lastPage: 0,
  },
  addEmployeeResult: null,
};

const slice = createSlice({
  name: 'employee',
  initialState,
  reducers: {
    getEmployees(state) {},
    successGetEmployees(
      state,
      action: PayloadAction<ApiResponse<InfoEmployee[]>>,
    ) {
      state.employees = action.payload.data;
      state.paginationResult = paginateList(
        state.employees,
        state.infoPagination,
      );
    },
    failedGetEmployees(state, action: PayloadAction<ApiError>) {
      state.error = action.payload;
    },
    updatePagination(state, action: PayloadAction<InfoPagination>) {
      state.infoPagination = action.payload;
      state.paginationResult = paginateList(
        state.employees,
        state.infoPagination,
      );
    },
    addEmployee(state, action: PayloadAction<InfoAddEmployee>) {},
    successAddEmployee(
      state,
      action: PayloadAction<ApiResponse<InfoEmployee>>,
    ) {
      state.addEmployeeResult = action.payload.data;
    },
    resetState(state) {
      state.employees = initialState.employees;
      state.error = initialState.error;
      state.employees = initialState.employees;
      state.infoPagination = initialState.infoPagination;
      state.paginationResult = initialState.paginationResult;
      state.addEmployeeResult = initialState.addEmployeeResult;
    },
  },
});

export const { actions: employeeActions } = slice;

export const useEmployeeSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: employeeSaga });
  return { actions: slice.actions };
};

/**
 * Example Usage:
 *
 * export function MyComponentNeedingThisSlice() {
 *  const { actions } = useEmployeeSlice();
 *
 *  const onButtonClick = (evt) => {
 *    dispatch(actions.someAction());
 *   };
 * }
 */
