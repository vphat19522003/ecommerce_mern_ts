export type FilterFieldType = {
  id: string;
  label: string;
  type: 'input' | 'combobox' | 'date-picker' | 'date-range-picker';
};

export type TableFilterPropsType<TData> = {
  filterField: FilterFieldType[];
  isLoading?: boolean;
  canClear?: boolean;
  onSubmit?: (data: TData) => void;
  initialFilterData?: TData;
};
