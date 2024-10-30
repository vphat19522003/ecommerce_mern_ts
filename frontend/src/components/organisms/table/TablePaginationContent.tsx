import { TablePagination } from '@mui/material';

import { ResultOfUseTableData } from '@app/hooks/useTableData';

type TablePaginationProps<TData, TFilterFormData, TFilterData> = {
  tableData: ResultOfUseTableData<TData, TFilterFormData, TFilterData>;
  dataLength: number;
};
const TablePaginationContent = <TData, TFilterFormData, TFilterData>({
  dataLength,
  tableData
}: TablePaginationProps<TData, TFilterFormData, TFilterData>): JSX.Element => {
  return (
    <TablePagination
      component='div'
      labelRowsPerPage={'Rows:'}
      count={dataLength}
      page={tableData.currentPage as number}
      onPageChange={tableData.handleChangePage}
      onRowsPerPageChange={tableData.handleChangePageSize}
      rowsPerPage={tableData.pageSize as number}
      showFirstButton
      showLastButton
      labelDisplayedRows={({ page }) => `${page + 1} of ${tableData.maxPageNumber}`}
      rowsPerPageOptions={tableData.itemPerPage}
      sx={{ mt: 2 }}
    />
  );
};

export default TablePaginationContent;
