import { useState } from 'react';

import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { Checkbox, Collapse, IconButton, TableCell, TableRow } from '@mui/material';

import { TData } from '@app/hooks/useTableData';

import { TableFieldType } from './type';

type TableRowItemCollapseProps = {
  tableField: TableFieldType[];
  renderActions: (item) => JSX.Element;
  row: TData;
  selection: boolean;
  selectedList: TData[];
  handleSelectItem: (row) => void;
  uniqueField: string;
  collapsed?: boolean;
  index: number;
  open?: boolean;
};

const TableRowItemCollapse = ({
  row,
  tableField,
  renderActions,
  selection,
  selectedList,
  handleSelectItem,
  uniqueField,
  collapsed,
  index
}: TableRowItemCollapseProps): JSX.Element => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <TableRow
        sx={{
          background: row.parent ? '#e6f7ff' : index % 2 === 0 ? '#f8f9fa' : 'inherit',
          // Chỉ định màu nền khác nếu có parent, hoặc áp dụng màu nền cho các hàng chẵn
          visibility: open || !row.parent ? 'visible' : 'collapse'
        }}
        className='relative'>
        {row.child && (
          <TableCell padding='checkbox' className={`${row.parent ? '!pl-10' : ''}`}>
            <IconButton onClick={() => setOpen((prev) => !prev)}>
              {open ? <ExpandLess className='text-pink-500' /> : <ExpandMore className='text-pink-500' />}
            </IconButton>
          </TableCell>
        )}
        {selection && (
          <TableCell padding='checkbox' className={`${row.parent ? '!pl-10' : ''}`}>
            <Checkbox
              onChange={() => {
                handleSelectItem(row);
              }}
              checked={selectedList.some((item) => item[uniqueField] === row[uniqueField])}
            />
          </TableCell>
        )}
        {tableField.map((item, idx) => {
          if (item?.customRender) {
            return <TableCell key={idx}>{item?.customRender?.(row)}</TableCell>;
          }

          return (
            <TableCell key={idx} align={item?.textAlign}>
              {item.field !== 'action' ? row[item.field] : renderActions(row)}
            </TableCell>
          );
        })}
      </TableRow>

      {open && (
        <>
          {row.child?.map((subRow, index) =>
            !subRow.child ? (
              <TableRow key={index}>
                <TableCell colSpan={tableField?.length + 2}>
                  <Collapse in={open} timeout='auto' unmountOnExit>
                    testttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttt
                  </Collapse>
                </TableCell>
              </TableRow>
            ) : (
              // <TableRowItemCollapse
              //   key={index}
              //   tableField={tableField}
              //   renderActions={renderActions}
              //   row={subRow}
              //   handleSelectItem={handleSelectItem}
              //   selectedList={selectedList}
              //   uniqueField={uniqueField}
              //   selection={selection}
              //   collapsed={collapsed}
              //   index={index}
              //   open={open}
              // />
              <TableRow key={index}>
                <TableCell colSpan={tableField?.length + 1}>
                  <Collapse in={open} timeout='auto' unmountOnExit>
                    testttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttt
                  </Collapse>
                </TableCell>
              </TableRow>
            )
          )}
        </>
      )}
    </>
  );
};

export default TableRowItemCollapse;
