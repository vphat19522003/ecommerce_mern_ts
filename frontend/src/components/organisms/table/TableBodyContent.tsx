import { Checkbox, Stack, TableCell, TableRow, Typography } from '@mui/material';

import ViteImg from '@app/assets/vite.svg';

import { TableFieldType } from './type';

type TableBodyContentProps<TItemType> = {
  data: TItemType[];
  selection?: boolean;
  tableField: TableFieldType[];
  renderActions: (item: TItemType) => JSX.Element;
  handleSelectItem: (row: TItemType) => void;
  selectedList: TItemType[];
  uniqueField: string;
};

const TableBodyContent = <TData,>({
  data = [],
  selection = false,
  tableField,
  renderActions,
  handleSelectItem,
  selectedList,
  uniqueField
}: TableBodyContentProps<TData>): JSX.Element => {
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
              className='relative'>
              {selection && (
                <TableCell padding='checkbox'>
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
          ))}
        </>
      ) : (
        <TableRow>
          <TableCell colSpan={selection ? tableField.length + 1 : tableField.length}>
            <Stack justifyContent={'center'} alignItems={'center'} className='py-12'>
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
