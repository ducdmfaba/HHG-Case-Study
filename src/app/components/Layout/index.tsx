/**
 *
 * Layout
 *
 */
import * as React from 'react';
import { Container } from 'react-bootstrap';
import { ReactElement } from 'react';
import { Header } from '../Header';

interface Props {
  children: ReactElement;
}

export function Layout(props: Props) {
  const { children } = props;
  return (
    <>
      <Header />
      <Container className="mt-5">{children}</Container>
    </>
  );
}
