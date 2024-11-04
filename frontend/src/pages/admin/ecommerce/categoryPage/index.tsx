import PageTitle from '@app/components/molecules/admin/pageTitle';
import CustomTable from '@app/components/organisms/table';
import { TableFieldType } from '@app/components/organisms/table/type';
import TableFilter from '@app/components/organisms/tableFilter';
import { FilterFieldTypeCustom } from '@app/components/organisms/tableFilter/type';
import useTableData from '@app/hooks/useTableData';

const CategoryPage = (): JSX.Element => {
  const filterField: FilterFieldTypeCustom[] = [
    { id: 'fullname', label: 'Name', type: 'input' },
    {
      id: 'gender',
      label: 'Gender',
      type: 'combobox',
      data: [
        { label: 'Male', value: 'male', name: 'male' },
        { label: 'Female', value: 'female', name: 'female' }
      ]
    }
    // { id: 'from_date', label: 'From Date', type: 'date-picker' }
  ];

  const tableField: TableFieldType[] = [
    { field: 'fullname', label: 'Name', textAlign: 'center' },
    { field: 'from_date', label: 'From Date', textAlign: 'center' },
    { field: 'to_date', label: 'To Date', textAlign: 'center' },
    { field: 'action', label: 'Actions' }
  ];

  const data = [
    {
      fullname: 'Vo Phat',
      from_date: '2024-02-01',
      to_date: '2024-10-01',
      child: [
        {
          fullname: 'Vo Phat Child',
          from_date: '2024-02-01',
          to_date: '2024-10-01',
          parent: 'Vo Phat',
          child: [
            {
              fullname: 'Vo Phat Child42142',
              from_date: '2024-02-01',
              to_date: '2024-10-01',
              parent: 'Vo Phat Child'
            },
            {
              fullname: 'Vo Phat Child3432',
              from_date: '2024-02-01',
              to_date: '2024-10-01',
              parent: 'Vo Phat Child'
            },
            {
              fullname: 'Vo Phat Child5334',
              from_date: '2024-02-01',
              to_date: '2024-10-01',
              parent: 'Vo Phat Child'
            }
          ]
        },
        {
          fullname: 'Vo Phat Child333',
          from_date: '2024-02-01',
          to_date: '2024-10-01',
          parent: 'Vo Phat'
        },
        {
          fullname: 'Vo Phat Child444',
          from_date: '2024-02-01',
          to_date: '2024-10-01',
          parent: 'Vo Phat'
        }
      ]
    },
    { fullname: 'Phat Vo', from_date: '2024-02-01', to_date: '2024-10-01' },
    { fullname: 'Vo', from_date: '2024-02-01', to_date: '2024-10-01' },
    { fullname: 'Phat', from_date: '2024-02-01', to_date: '2024-10-01' },
    { fullname: 'V', from_date: '2024-02-01', to_date: '2024-10-01' },
    { fullname: 'Nuyen Phat', from_date: '2024-02-01', to_date: '2024-10-01' },
    { fullname: 'Phat Nuyen', from_date: '2024-02-01', to_date: '2024-10-01' },
    { fullname: 'Phat Tran', from_date: '2024-02-01', to_date: '2024-10-01' },
    { fullname: 'Tran Vo', from_date: '2024-02-01', to_date: '2024-10-01' },
    { fullname: 'Minh Phat', from_date: '2024-02-01', to_date: '2024-10-01' },
    { fullname: 'Phat Minh', from_date: '2024-02-01', to_date: '2024-10-01' },
    { fullname: 'Quang Vo', from_date: '2024-02-01', to_date: '2024-10-01' },
    { fullname: 'Vo Quang', from_date: '2024-02-01', to_date: '2024-10-01' },
    { fullname: 'Long Phat', from_date: '2024-02-01', to_date: '2024-10-01' },
    { fullname: 'Phat Long', from_date: '2024-02-01', to_date: '2024-10-01' },
    { fullname: 'An Vo', from_date: '2024-02-01', to_date: '2024-10-01' },
    { fullname: 'Vo An', from_date: '2024-02-01', to_date: '2024-10-01' },
    { fullname: 'Binh Vo', from_date: '2024-02-01', to_date: '2024-10-01' },
    { fullname: 'Vo Binh', from_date: '2024-02-01', to_date: '2024-10-01' },
    { fullname: 'Thao Vo', from_date: '2024-02-01', to_date: '2024-10-01' }
  ];
  const tableData = useTableData({});
  return (
    <>
      <PageTitle />
      <TableFilter
        filterField={filterField}
        onSubmit={(data) => {
          console.log('Filter data', data);
        }}
      />
      <div className='grid grid-cols-1'>
        <CustomTable
          data={data}
          tableData={tableData}
          tableField={tableField}
          pagination
          uniqueField='fullname'
          collapsed
        />
      </div>
    </>
  );
};

export default CategoryPage;
