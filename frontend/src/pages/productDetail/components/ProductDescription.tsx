import { Stack, Typography } from '@mui/material';

import { getProductDetailCustom } from '@app/pages/admin/ecommerce/addNewProductPage/components/schemas';

type ProductDescriptionProps = {
  productDetail: getProductDetailCustom;
};

const ProductDescription = ({ productDetail }: ProductDescriptionProps): JSX.Element => {
  return (
    <Stack>
      <Typography>Description: {productDetail?.productName}</Typography>
    </Stack>
  );
};

export default ProductDescription;
