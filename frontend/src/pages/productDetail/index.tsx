import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

import { Stack } from '@mui/material';

import { useGetDetailProduct } from '@app/api/hooks/product.hook';
import BreadCrumb from '@app/components/organisms/breadcrumb';
import { useDevice } from '@app/hooks/useDevice';

import { getProductDetailCustom } from '../admin/ecommerce/addNewProductPage/components/schemas';
import ProductDescription from './components/ProductDescription';
import ProductImage from './components/ProductImage';

const ProductDetailPage = (): JSX.Element => {
  const [searchParams] = useSearchParams();
  const { isMobile } = useDevice();

  const productId = searchParams.get('productId');

  const { data: productDetail } = useGetDetailProduct(productId as string);

  useEffect(() => {
    console.log({ productDetail });
  }, [productId]);

  return (
    <Stack>
      <BreadCrumb
        productName={productDetail?.productName}
        mainCategory={productDetail?.category.name as string}
        subCategories={[]}
      />
      <Stack direction={isMobile ? 'column' : 'row'} spacing={4} className=' max-h-max mb-4'>
        {/* 2 section : {Product Image, Product description} {Product comment} */}
        <Stack direction={'column'} spacing={4} className={`${isMobile ? 'w-full' : 'w-9/12'}`}>
          {/* Product Image & Description */}
          <Stack direction={isMobile ? 'column' : 'row'} spacing={4} className='max-h-max min-h-[100px] '>
            {/* Product Image Section */}
            <Stack
              className={`${isMobile ? 'w-full' : 'w-2/5'} bg-white rounded-lg max-h-max`}
              style={{
                position: isMobile ? 'unset' : 'sticky',
                top: isMobile ? '0px' : '16px',
                boxShadow: '0 0 15px rgba(0, 0, 0, 0.1)'
              }}>
              <ProductImage productDetail={productDetail as getProductDetailCustom} />
            </Stack>
            {/* Product Description Section */}
            <Stack
              className={`${isMobile ? 'w-full' : 'w-3/5'} min-h-[1300px] max-h-max bg-white rounded-lg`}
              style={{
                boxShadow: '0 0 15px rgba(0, 0, 0, 0.1)'
              }}>
              <ProductDescription productDetail={productDetail as getProductDetailCustom} />
            </Stack>
          </Stack>
          {/* Product comment */}
          <Stack
            className='w-full h-[300px] bg-white rounded-lg'
            style={{
              boxShadow: '0 0 15px rgba(0, 0, 0, 0.1)'
            }}>
            Comments
          </Stack>
        </Stack>
        {/* Product detail action : add to cart, buy now */}
        <Stack
          direction={isMobile ? 'column' : 'row'}
          className={`${isMobile ? 'w-full' : 'w-3/12'} bg-white rounded-lg h-[400px]`}
          style={{
            position: isMobile ? 'unset' : 'sticky',
            top: isMobile ? '0px' : '16px',
            boxShadow: '0 0 15px rgba(0, 0, 0, 0.1)'
          }}>
          Action
        </Stack>
      </Stack>
    </Stack>
  );
};

export default ProductDetailPage;
