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

export function* employeeSaga() {
  yield takeLatest(actions.getEmployees.type, getEmployees);
}
