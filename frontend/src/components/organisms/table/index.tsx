import React, { useCallback } from 'react';

import { Delete, Edit } from '@mui/icons-material';
import { IconButton, Stack, Table, TableBody, TableContainer, TableHead, Tooltip } from '@mui/material';

import { DEFAULT_DATA_LENGTH, DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from '@app/constants/table';

import TableBodyContent from './TableBodyContent';
import TableHeadContent from './TableHeadContent';
import TablePaginationContent from './TablePaginationContent';
import { TableFieldType } from './type';

type CustomTableProps<TItemType> = {
  data: TItemType[];
  tableField: TableFieldType[];
  selection?: boolean;
  CustomAction?: React.ElementType;
  handleDelete?: (item: TItemType) => void;
  handleEdit?: (item: TItemType) => void;
  pagination?: boolean;
};

const CustomTable = <TData,>({
  data = [],
  tableField,
  selection,
  CustomAction,
  handleDelete,
  handleEdit,
  pagination = false
}: CustomTableProps<TData>): JSX.Element => {
  const currentPage = DEFAULT_PAGE;
  const pageSize = DEFAULT_PAGE_SIZE;
  const totalDataLength = DEFAULT_DATA_LENGTH;

  const handleEditDefault = (item: TData) => {
    console.log('You is editing: ', item);
  };

  const handleDeleteDefault = (item: TData) => {
    console.log('You is delete: ', item);
  };

  const renderAction = useCallback(
    (item: TData): JSX.Element =>
      !CustomAction ? (
        <Stack direction={'row'} justifyContent={'center'}>
          <Tooltip title='Edit'>
            <IconButton
              aria-label='edit'
              className='text-blue-700'
              onClick={() => {
                handleEdit ? handleEdit(item) : handleEditDefault(item);
              }}>
              <Edit />
            </IconButton>
          </Tooltip>
          <Tooltip title='Delete'>
            <IconButton
              aria-label='delete'
              className='text-pink-500'
              onClick={() => {
                handleDelete ? handleDelete(item) : handleDeleteDefault(item);
              }}>
              <Delete />
            </IconButton>
          </Tooltip>
        </Stack>
      ) : (
        <CustomAction {...item} />
      ),
    []
  );

  return (
    <React.Fragment>
      <TableContainer>
        <Table sx={{ minWidth: 800 }}>
          <TableHead>
            <TableHeadContent
              tableField={tableField}
              selection={!!selection}
              totalSelected={10}
              dataLength={totalDataLength}
            />
          </TableHead>
          <TableBody>
            <TableBodyContent data={data} selection tableField={tableField} renderActions={renderAction} />
          </TableBody>
        </Table>
      </TableContainer>
      {!!pagination && <TablePaginationContent />}
    </React.Fragment>
  );
};

export default CustomTable;
