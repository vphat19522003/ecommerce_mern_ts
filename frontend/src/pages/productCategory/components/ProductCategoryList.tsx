import { Stack } from '@mui/material';

import ProductCard from '@app/components/organisms/productCard';
import { useDevice } from '@app/hooks/useDevice';
import { getProductTypeCustom } from '@app/pages/admin/ecommerce/addNewProductPage/components/schemas';

type ProductCategoryListProps = {
  listProduct: getProductTypeCustom[];
};

const ProductCategoryList = ({ listProduct }: ProductCategoryListProps): JSX.Element => {
  const { isMobile } = useDevice();
  return (
    <Stack>
      <div className={`grid gap-4  ${isMobile ? 'sm:grid-cols-3 xs:grid-cols-2' : 'grid-cols-4'}`}>
        {listProduct.map((item, index) => (
          <ProductCard
            key={index}
            productId={item._id}
            productName={item.productName}
            productPrice={item.productPrice}
            productThumbImg={item.productThumbImg}
            description={item.description}
          />
        ))}
      </div>
    </Stack>
  );
};

export default ProductCategoryList;
