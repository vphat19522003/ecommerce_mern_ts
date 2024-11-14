import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

import { useGetDetailProduct } from '@app/api/hooks/product.hook';

const ProductDetailPage = (): JSX.Element => {
  const [searchParams] = useSearchParams();

  const productId = searchParams.get('productId');

  const { data: productDetail = {} } = useGetDetailProduct(productId as string);

  useEffect(() => {
    console.log({ productDetail });
  }, [productId]);

  return <div className='p-4'>ProductDetailPage</div>;
};

export default ProductDetailPage;
