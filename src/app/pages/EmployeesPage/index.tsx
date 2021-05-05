/**
 *
 * EmployeesPage
 *
 */
import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { Layout } from '../../components/Layout';
import { Table } from 'app/components/Table';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEmployeeSlice } from './slice';
import { selectEmployee } from './slice/selectors';
import { Pagination } from 'app/components/Pagination';
import { Button } from 'react-bootstrap';
import { ModalAddEmployee } from './components/ModalAddEmployee';

const tableEmployeeColumns: string[] = ['name', 'email', 'position'];

export function EmployeesPage() {
  const dispatch = useDispatch();
  const { actions } = useEmployeeSlice();
  const { infoPagination, paginationResult, addEmployeeResult } = useSelector(
    selectEmployee,
  );
  const { data, lastPage } = paginationResult;
  const { limit, page } = infoPagination;
  const [show, setShow] = useState<boolean>(false);

  useEffect(() => {
    dispatch(actions.getEmployees());
  }, [actions, dispatch]);

  //Reset state when leave page
  useEffect(() => {
    return () => {
      dispatch(actions.resetState());
    };
  }, [actions, dispatch]);

  useEffect(() => {
    if (addEmployeeResult) {
      onHide();
      alert('Employee has been added successfully.');
    }
  }, [addEmployeeResult]);

  const onHide = () => {
    setShow(false);
  };

  return (
    <>
      <Helmet>
        <title>Employees Page</title>
        <meta name="description" content="Employees Page" />
      </Helmet>
      <Layout>
        <Table columns={tableEmployeeColumns}>
          <React.Fragment>
            {data.map(employee => (
              <tr>
                <td>{employee.name}</td>
                <td>{employee.email}</td>
                <td>{employee.position}</td>
              </tr>
            ))}
          </React.Fragment>
        </Table>
        <div className="d-flex justify-content-between align-items-center">
          <Button
            onClick={() => {
              setShow(true);
            }}
          >
            New
          </Button>
          <Pagination lastPage={lastPage} currentPage={page} limit={limit} />
        </div>
        <ModalAddEmployee show={show} onHide={onHide} />
      </Layout>
    </>
  );
}
