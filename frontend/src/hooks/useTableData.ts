import { useCallback, useState } from 'react';

import {
  DEFAULT_DATA_LENGTH,
  DEFAULT_ITEM_PER_PAGE,
  DEFAULT_MAX_PAGE,
  DEFAULT_PAGE,
  DEFAULT_PAGE_SIZE
} from '@app/constants/table';

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
  maxPageNumber: number;
  filterData?: TFilterData;
  selectedList: TData[];

  handlePagination: (pagination: PaginationOptionType) => void;
  handleChangePage: (e, page: number) => void;
  handleChangePageSize: (e) => void;
  handleSelectRow: (data: TData[]) => void;
  handleChangeMaxPage: (maxPage: number) => void;
  //   handleSearchClick: (value: TFilterFormData) => void;
}

type useTableDataProps = {
  currentPage?: number;
  pageSize?: number;
  totalDataLength?: number;
  itemPerPage?: number[];
};

const useTableData = <TData, TFilterFormData, TFilterData>({
  currentPage = DEFAULT_PAGE,
  pageSize = DEFAULT_PAGE_SIZE,
  totalDataLength = DEFAULT_DATA_LENGTH,
  itemPerPage = DEFAULT_ITEM_PER_PAGE
}: useTableDataProps): ResultOfUseTableData<TData, TFilterFormData, TFilterData> => {
  const [pagination, setPagination] = useState<PaginationType>({
    currentPage,
    pageSize,
    totalDataLength
  });
  const [selectedList, setSelectedList] = useState<TData[]>([]);

  const [maxPage, setMaxPage] = useState(
    !!pagination.totalDataLength ? Math.ceil(pagination.totalDataLength / pagination.pageSize) - 1 : DEFAULT_MAX_PAGE
  );

  const handleSelectRow = (data: TData[]) => {
    setSelectedList(data);
  };

  const handlePagination = (pagination: PaginationOptionType) => {
    setPagination((prev) => ({
      ...prev,
      ...pagination
    }));
  };

  const handleChangePage = (e: React.MouseEvent<HTMLButtonElement> | null, page: number) => {
    setPagination((prev) => ({
      ...prev,
      currentPage: page
    }));
  };

  const handleChangePageSize = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setPagination((prev) => {
      if (prev.pageSize !== Number(e.target.value)) {
        return {
          ...prev,
          ...{
            pageSize: Number(e.target.value),
            currentPage: DEFAULT_PAGE
          }
        };
      } else {
        return prev;
      }
    });
  };

  const handleChangeMaxPage = useCallback((maxPage: number) => {
    setMaxPage(maxPage);
  }, []);
  return {
    currentPage: pagination.currentPage,
    pageSize: pagination.pageSize,
    totalDataLength: pagination.totalDataLength,
    itemPerPage,
    selectedList,
    maxPageNumber: maxPage,

    handleSelectRow,
    handlePagination,
    handleChangePage,
    handleChangePageSize,
    handleChangeMaxPage
  };
};

export default useTableData;
