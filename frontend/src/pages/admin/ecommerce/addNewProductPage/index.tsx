import { useGetMainCategory } from '@app/api/hooks/category.hook';

import AddNewProductForm from './components/addNewProductForm';
import { AddNewProductFormType } from './components/schemas';

const AddNewProductPage = (): JSX.Element => {
  const { data: mainCategory = [] } = useGetMainCategory();

  const handleAddNewProduct = (value: AddNewProductFormType) => {
    console.log(value);
  };
  return <AddNewProductForm mainCategory={mainCategory} handleAddNewProduct={handleAddNewProduct} />;
};

export default AddNewProductPage;
