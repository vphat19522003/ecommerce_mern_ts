import PageTitle from '@app/components/molecules/admin/pageTitle';
import CustomTable from '@app/components/organisms/table';
import { TableFieldType } from '@app/components/organisms/table/type';

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
      fullname: 'Vo Phat',
      from_date: '2024-02-01',
      to_date: '2024-10-01'
    }
  ];
  return (
    <>
      <PageTitle />
      <div className='grid grid-cols-1'>
        <CustomTable tableField={tableField} data={data} selection pagination />
      </div>
    </>
  );
};

export default CategoryPage;
