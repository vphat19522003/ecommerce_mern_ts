import { TablePagination } from '@mui/material';

const TablePaginationContent = (): JSX.Element => {
  return <TablePagination component='div' count={100} page={0} onPageChange={() => {}} rowsPerPage={5} />;
};

export default TablePaginationContent;
