import { useState } from 'react';

import { DEFAULT_DATA_LENGTH, DEFAULT_ITEM_PER_PAGE, DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from '@app/constants/table';

interface PaginationType {
  currentPage: number;
  pageSize: number;
  totalDataLength: number;
}

interface PaginationOptionType {
  currentPage?: number;
  pageSize?: number;
  totalDataLength?: number;
}

export interface ResultOfUseTableData<TData, TFilterFormData, TFilterData> {
  currentPage?: number;
  pageSize?: number;
  totalDataLength?: number;
  itemPerPage?: number[];
  maxPageNumber?: number;
  filterData?: TFilterData;
  selectedList: TData[];
  //   handleSearchClick: (value: TFilterFormData) => void;
  handlePagination: (pagination: PaginationOptionType) => void;
  handleChangePage: (e, page: number) => void;
  handleChangePageSize: (e) => void;
  //handleChangeMaxPage: (maxPage: number) => void;
  handleSelectRow: (data: TData[]) => void;
}

type useTableDataProps = {
  currentPage?: number;
  pageSize?: number;
  totalDataLength?: number;
  itemPerPage?: number[];
  maxPageNumber?: number;
};

const useTableData = <TData, TFilterFormData, TFilterData>({
  currentPage = DEFAULT_PAGE,
  pageSize = DEFAULT_PAGE_SIZE,
  totalDataLength = DEFAULT_DATA_LENGTH,
  itemPerPage = DEFAULT_ITEM_PER_PAGE,
  maxPageNumber
}: useTableDataProps): ResultOfUseTableData<TData, TFilterFormData, TFilterData> => {
  const [selectedList, setSelectedList] = useState<TData[]>([]);

  const [pagination, setPagination] = useState<PaginationType>({
    currentPage,
    pageSize,
    totalDataLength
  });

  const handleSelectRow = (data) => {
    setSelectedList(data);
  };

  const handlePagination = (pagination: PaginationOptionType) => {
    setPagination((prev) => ({
      ...prev,
      ...pagination
    }));
  };

  const handleChangePage = (e, page) => {
    setPagination((prev) => ({
      ...prev,
      currentPage: page
    }));
  };

  const handleChangePageSize = (e) => {
    setPagination((prev) => {
      if (prev.pageSize !== e.target.value) {
        return {
          ...prev,
          ...{ pageSize: e.target.value, page: DEFAULT_PAGE }
        };
      } else {
        return prev;
      }
    });
  };

  return {
    currentPage: pagination.currentPage,
    pageSize: pagination.pageSize,
    totalDataLength: pagination.totalDataLength,
    itemPerPage,
    selectedList,

    handleSelectRow,
    handlePagination,
    handleChangePage,
    handleChangePageSize
  };
};

export default useTableData;
