/**
 *
 * Table
 *
 */
import * as React from 'react';
import { Table as TableBoostrap } from 'react-bootstrap';
import { ReactElement } from 'react';

interface Props {
  columns: string[];
  children: ReactElement | ReactElement[];
}

export function Table(props: Props) {
  const { columns, children } = props;

  return (
    <TableBoostrap bordered hover>
      <thead>
        <tr>
          {columns.map(columnName => (
            <th className="text-capitalize">{columnName}</th>
          ))}
        </tr>
      </thead>
      <tbody>{children}</tbody>
    </TableBoostrap>
  );
}
