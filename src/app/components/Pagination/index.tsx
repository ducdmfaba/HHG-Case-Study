/**
 *
 * PaginationBootstrap
 *
 */
import * as React from 'react';
import { Pagination as PaginationBootstrap } from 'react-bootstrap';
import { ReactElement } from 'react';
import { useDispatch } from 'react-redux';
import { useEmployeeSlice } from '../../pages/EmployeesPage/slice';

interface Props {
  lastPage: number;
  currentPage: number;
  limit: number;
}

export function Pagination(props: Props) {
  const dispatch = useDispatch();
  const { actions } = useEmployeeSlice();
  const { currentPage, lastPage, limit } = props;
  const { Item, Ellipsis } = PaginationBootstrap;

  const PageItem = ({ number }) => {
    return (
      <Item
        active={Boolean(number === currentPage)}
        onClick={() =>
          dispatch(actions.updatePagination({ limit, page: number }))
        }
      >
        {number}
      </Item>
    );
  };

  const renderPagination = () => {
    const htmlPagination: ReactElement[] = [];

    if (lastPage <= 6) {
      //render
      for (let number = 1; number <= lastPage; number++) {
        htmlPagination.push(<PageItem number={number} key={number} />);
      }
      return htmlPagination;
    } else {
      const begin = [1, 2, 3];
      const end = [lastPage, lastPage - 1, lastPage - 2];

      if (begin.includes(currentPage)) {
        //render 1, 2, 3, 4, 5...10
        for (let number = 1; number <= begin.length + 2; number++) {
          htmlPagination.push(<PageItem number={number} key={number} />);
        }
        return (
          <React.Fragment>
            {htmlPagination}
            <Ellipsis />
            <PageItem number={lastPage} />
          </React.Fragment>
        );
      }

      if (end.includes(currentPage)) {
        for (
          let number = lastPage - end.length - 1;
          number <= lastPage;
          number++
        ) {
          htmlPagination.push(<PageItem number={number} key={number} />);
        }
        return (
          <React.Fragment>
            <PageItem number={1} />
            <Ellipsis />
            {htmlPagination}
          </React.Fragment>
        );
      }

      //If number active between 5 and 10
      return (
        <React.Fragment>
          <PageItem number={1} />
          {currentPage - 3 !== 1 && <Ellipsis />}
          <PageItem number={currentPage - 2} />
          <PageItem number={currentPage - 1} />
          <PageItem number={currentPage} />
          <PageItem number={currentPage + 1} />
          <PageItem number={currentPage + 2} />
          {currentPage + 3 !== lastPage && <Ellipsis />}
          <PageItem number={lastPage} />
        </React.Fragment>
      );
    }
  };

  return (
    <PaginationBootstrap className="mb-0">
      {renderPagination()}
    </PaginationBootstrap>
  );
}
