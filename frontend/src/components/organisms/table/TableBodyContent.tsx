import { useState } from 'react';

import { Checkbox, Stack, TableCell, TableRow, Typography } from '@mui/material';

import ViteImg from '@app/assets/vite.svg';

import { TableFieldType } from './type';

type TableBodyContentProps<TItemType> = {
  data: TItemType[];
  selection?: boolean;
  tableField: TableFieldType[];
  renderActions: (item: TItemType) => JSX.Element;
};

const TableBodyContent = <TData,>({
  data = [],
  selection = false,
  tableField,
  renderActions
}: TableBodyContentProps<TData>): JSX.Element => {
  const [hoveredRowIndex, setHoveredRowIndex] = useState<number | null>(null);

  return (
    <>
      {data.length > 0 ? (
        <>
          {data.map((row, index) => (
            <TableRow
              key={index}
              sx={{
                '&:nth-of-type(even)': {
                  // Sử dụng :nth-of-type thay vì :nth-child
                  background: '#f8f9fa'
                }
              }}
              onMouseEnter={() => {
                setHoveredRowIndex(index);
              }}
              onMouseLeave={() => {
                setHoveredRowIndex(null);
              }}
              className='relative'>
              {selection && (
                <TableCell padding='checkbox'>
                  <Checkbox />
                </TableCell>
              )}
              {tableField.map((item, idx) => {
                if (item?.customRender) {
                  return <TableCell key={idx}>{item?.customRender?.(row)}</TableCell>;
                }
                if (item.field === 'action') {
                  return (
                    hoveredRowIndex === index && (
                      <Stack
                        direction={'row'}
                        key={idx}
                        className='absolute top-1 right-3 bg-white shadow-md rounded-lg px-2 '>
                        {renderActions(row)}
                      </Stack>
                    )
                  );
                }
                return (
                  <TableCell key={idx} align={item?.textAlign}>
                    {/* {item.field !== 'action' ? row[item.field] : renderActions(row)} */}
                    {row[item.field]}
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
        </>
      ) : (
        <TableRow>
          <TableCell colSpan={selection ? data.length + 1 : data.length} className='!border-none'>
            <Stack justifyContent={'center'} alignItems={'center'} className='py-3'>
              <img src={ViteImg} width={60} alt='logo' />
              <Typography sx={{ color: '#6C737F' }}>No Data</Typography>
            </Stack>
          </TableCell>
        </TableRow>
      )}
    </>
  );
};

export default TableBodyContent;
