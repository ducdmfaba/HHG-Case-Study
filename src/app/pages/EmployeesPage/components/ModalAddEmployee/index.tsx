/**
 *
 * ModalAddEmployee
 *
 */
import * as React from 'react';
import { Modal } from 'app/components/Modal';
import { FormGroup, FormLabel, FormControl, Button } from 'react-bootstrap';
import { FormikProps, withFormik, ErrorMessage } from 'formik';
import { InfoAddEmployee } from 'types/Employee';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { useEmployeeSlice } from '../../slice';
import { Modal as ModalBoostrap } from 'react-bootstrap';
import { Dispatch } from 'react';
import { CaseReducerActions } from '@reduxjs/toolkit';
import { EmployeeState } from '../../slice/types';

interface Props extends ModalProps {
  dispatch: Dispatch<any>;
  actions: CaseReducerActions<{
    addEmployee(
      state: EmployeeState,
      action: { payload: InfoAddEmployee; type: string },
    ): void;
    resetState(): void;
  }>;
}

interface ModalProps {
  show: boolean;
  onHide: () => void;
}

function ModalAddEmployeeInnerForm(
  props: FormikProps<InfoAddEmployee> & Props,
) {
  const { show, onHide, handleChange, handleSubmit } = props;
  const { Header, Title, Body } = ModalBoostrap;

  return (
    <Modal show={show} onHide={onHide}>
      <Header closeButton>
        <Title id="contained-modal-title-vcenter">Add Employee</Title>
      </Header>
      <Body>
        <form onSubmit={handleSubmit}>
          <FormGroup controlId="form-name">
            <FormLabel>Name</FormLabel>
            <FormControl name="name" type="text" onChange={handleChange} />
            <ErrorMessage name="name" />
          </FormGroup>
          <FormGroup controlId="form-email">
            <FormLabel>Email</FormLabel>
            <FormControl name="email" type="text" onChange={handleChange} />
            <ErrorMessage name="email" />
          </FormGroup>
          <FormGroup controlId="form-position">
            <FormLabel>Position</FormLabel>
            <FormControl name="position" type="text" onChange={handleChange} />
            <ErrorMessage name="position" />
          </FormGroup>
          <div className="d-flex">
            <Button type="submit" variant="primary" className="mr-2">
              Add
            </Button>
            <Button variant="light" onClick={onHide}>
              Close
            </Button>
          </div>
        </form>
      </Body>
    </Modal>
  );
}

const ModalAddEmployeeFormFormik = withFormik<Props, InfoAddEmployee>({
  mapPropsToValues: () => ({ email: '', name: '', position: '' }),
  validationSchema: Yup.object().shape({
    email: Yup.string()
      .email('Please input a valid email')
      .required('Please enter your email'),
    name: Yup.string().required('Please enter your name'),
    position: Yup.string().required('Please enter your position'),
  }),
  handleSubmit: (values, { props }) => {
    const { dispatch, actions } = props;
    dispatch(actions.addEmployee(values));
  },
})(ModalAddEmployeeInnerForm);

export const ModalAddEmployee = (props: ModalProps) => {
  const dispatch = useDispatch();
  const { actions } = useEmployeeSlice();

  return (
    <ModalAddEmployeeFormFormik
      {...props}
      dispatch={dispatch}
      actions={actions}
    />
  );
};
