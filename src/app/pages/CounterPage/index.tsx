/**
 *
 * CounterPage
 *
 */
import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { Layout } from 'app/components/Layout';
import { Button, Col, Row } from 'react-bootstrap';
import { useState } from 'react';

export function CounterPage() {
  const initialNumber: number = 0;
  const [number, setNumber] = useState<number>(initialNumber);

  const handleClickingIncrease = () => {
    setNumber(number + 1);
  };

  const resetCounter = () => {
    setNumber(initialNumber);
  };

  return (
    <>
      <Helmet>
        <title>Counter Page</title>
        <meta name="description" content="Counter Page" />
      </Helmet>
      <Layout>
        <Row className={'align-items-center'}>
          <Col lg={2} className="mb-2 mb-md-0">
            <span>Current counter: {number}</span>
          </Col>
          <Col lg={5}>
            <Button
              className={'mr-2'}
              variant="primary"
              onClick={handleClickingIncrease}
            >
              Increase
            </Button>
            <Button variant="secondary" onClick={resetCounter}>
              Reset Counter
            </Button>
          </Col>
        </Row>
      </Layout>
    </>
  );
}
