import { call, put, takeLatest } from 'redux-saga/effects';
import { employeeActions as actions } from '.';
import { EmployeeService } from 'services/employee.service';

function* getEmployees() {
  try {
    const response = yield call([
      EmployeeService,
      EmployeeService.getEmployees,
    ]);
    yield put(actions.successGetEmployees(response));
  } catch (e) {
    yield put(actions.failedGetEmployees(e));
  }
}

function* addEmployee(action) {
  const infoAddEmployee = action.payload;
  try {
    const response = yield call(
      [EmployeeService, EmployeeService.createEmployee],
      infoAddEmployee,
    );
    yield put(actions.getEmployees());
    yield put(actions.successAddEmployee(response));
  } catch (e) {
    yield put(actions.failedGetEmployees(e));
  }
}

export function* employeeSaga() {
  yield takeLatest(actions.getEmployees.type, getEmployees);
  yield takeLatest(actions.addEmployee.type, addEmployee);
}
