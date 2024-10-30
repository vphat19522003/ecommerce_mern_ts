import PageTitle from '@app/components/molecules/admin/pageTitle';
import CustomTable from '@app/components/organisms/table';
import { TableFieldType } from '@app/components/organisms/table/type';
import useTableData from '@app/hooks/useTableData';

const CategoryPage = (): JSX.Element => {
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
      to_date: '2024-10-01'
    },
    {
      fullname: 'Phat Vo',
      from_date: '2024-02-01',
      to_date: '2024-10-01'
    },
    {
      fullname: 'Vo',
      from_date: '2024-02-01',
      to_date: '2024-10-01'
    },
    {
      fullname: 'Phat',
      from_date: '2024-02-01',
      to_date: '2024-10-01'
    },
    {
      fullname: 'V',
      from_date: '2024-02-01',
      to_date: '2024-10-01'
    },
    {
      fullname: 'P',
      from_date: '2024-02-01',
      to_date: '2024-10-01'
    },
    {
      fullname: 't',
      from_date: '2024-02-01',
      to_date: '2024-10-01'
    },
    {
      fullname: 'o',
      from_date: '2024-02-01',
      to_date: '2024-10-01'
    },
    {
      fullname: 'h',
      from_date: '2024-02-01',
      to_date: '2024-10-01'
    },
    {
      fullname: 'at',
      from_date: '2024-02-01',
      to_date: '2024-10-01'
    },
    {
      fullname: 'hat',
      from_date: '2024-02-01',
      to_date: '2024-10-01'
    }
  ];

  const tableData = useTableData({});
  return (
    <>
      <PageTitle />
      <div className='grid grid-cols-1'>
        <CustomTable
          tableField={tableField}
          data={data}
          selection
          pagination
          uniqueField='fullname'
          tableData={tableData}
        />
      </div>
    </>
  );
};

export default CategoryPage;
