import { useLocation } from 'react-router-dom';

import { Stack } from '@mui/material';

import BreadCrumb from '@app/components/organisms/breadcrumb';
import { useDevice } from '@app/hooks/useDevice';

const ProductCategoryPage = (): JSX.Element => {
  const { isMobile } = useDevice();
  const location = useLocation();
  const path = location.pathname.split('/').filter((x) => x && x !== 'category');

  return (
    <Stack>
      <BreadCrumb mainCategory={path[0]} subCategories={path.slice(1)} />
      <Stack direction={isMobile ? 'column' : 'row'}>
        {/* Navigator */}
        <Stack></Stack>
        {/* Banner Category - Product List */}
        <Stack direction={'column'}>
          {/* Banner */}
          <Stack></Stack>
          {/* Product List */}
          <Stack></Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default ProductCategoryPage;
