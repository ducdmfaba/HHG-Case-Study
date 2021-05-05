/**
 *
 * Modal
 *
 */
import * as React from 'react';
import { Modal as ModalBootstrap } from 'react-bootstrap';
import { ReactElement } from 'react';

interface Props {
  children: ReactElement[];
  show: boolean;
  onHide: () => void;
}

export function Modal(props: Props) {
  const { children } = props;

  return (
    <ModalBootstrap
      {...props}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      {children}
    </ModalBootstrap>
  );
}
