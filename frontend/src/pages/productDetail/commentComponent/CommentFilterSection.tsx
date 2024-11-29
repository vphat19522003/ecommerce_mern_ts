import { Stack, Typography } from '@mui/material';

import ButtonForm from '@app/components/atoms/button';

const listFilterButton = [
  {
    name: 'latest',
    label: 'Latest',
    value: 1
  },
  {
    name: 'hasImage',
    label: 'Has Image',
    value: 2
  },
  {
    name: 'hasBought',
    label: 'Has Bought',
    value: 3
  },
  {
    name: 'fiveStar',
    label: '5 stars',
    value: 4
  },
  {
    name: 'fourStar',
    label: '4 stars',
    value: 5
  },
  {
    name: 'threeStar',
    label: '3 stars',
    value: 6
  },
  {
    name: 'twoStar',
    label: '2 stars',
    value: 7
  },
  {
    name: 'oneStar',
    label: '1 stars',
    value: 8
  }
];

const CommentFilterSection = (): JSX.Element => {
  return (
    <Stack className='min-h-12'>
      <Typography className='font-semibold text-md'>Filter by</Typography>
      <Stack direction={'row'} spacing={4} className='flex-wrap'>
        {listFilterButton.map((button, index) => (
          <ButtonForm key={index} variant='outlined' className='rounded-3xl mt-2'>
            {button.label}
          </ButtonForm>
        ))}
      </Stack>
    </Stack>
  );
};

export default CommentFilterSection;
