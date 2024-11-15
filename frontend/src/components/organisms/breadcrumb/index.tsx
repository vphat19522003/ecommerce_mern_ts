import { Link } from 'react-router-dom';

import { Home } from '@mui/icons-material';
import { Breadcrumbs, Stack, Typography } from '@mui/material';

type BreadCrumbProps = {
  mainCategory: string;
  subCategories: string[];
  productName?: string;
};

const BreadCrumb = ({ mainCategory, subCategories, productName }: BreadCrumbProps): JSX.Element => {
  return (
    <Breadcrumbs separator='>' aria-label='breadcrumb' className='py-4 text-md'>
      <Link to={'/'} className='no-underline text-[#39465f] hover:text-blue-700'>
        <Stack direction={'row'} alignItems={'center'} spacing={1}>
          <Home className='text-blue-700 text-xl' />
          <p>Home</p>
        </Stack>
      </Link>
      <Link to={'/'} className='no-underline text-[#39465f] hover:text-blue-700'>
        {mainCategory}
      </Link>
      {subCategories?.map((subCategories, index) => (
        <Link to={'/'} className='no-underline text-[#39465f] hover:text-blue-700' key={index}>
          {subCategories}
        </Link>
      ))}
      <Typography className='text-md'>{productName}</Typography>
    </Breadcrumbs>
  );
};

export default BreadCrumb;
