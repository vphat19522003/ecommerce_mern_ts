import { Stack, Typography } from '@mui/material';

import ButtonForm from '@app/components/atoms/button';

const listFilterButton = [
  {
    name: 'latest',
    label: 'Latest',
    value: 1,
    isChoose: false
  },
  {
    name: 'hasImage',
    label: 'Has Image',
    value: 2,
    isChoose: false
  },
  {
    name: 'hasBought',
    label: 'Has Bought',
    value: 3,
    isChoose: false
  },
  {
    name: 'fiveStar',
    label: '5 stars',
    value: 4,
    isChoose: false
  },
  {
    name: 'fourStar',
    label: '4 stars',
    value: 5,
    isChoose: false
  },
  {
    name: 'threeStar',
    label: '3 stars',
    value: 6,
    isChoose: false
  },
  {
    name: 'twoStar',
    label: '2 stars',
    value: 7,
    isChoose: false
  },
  {
    name: 'oneStar',
    label: '1 stars',
    value: 8,
    isChoose: false
  }
];

const CommentFilterSection = (): JSX.Element => {
  const onClickFilter = () => {};
  return (
    <Stack className='min-h-12'>
      <Typography className='font-semibold text-md'>Filter by</Typography>
      <Stack direction={'row'} spacing={4} className='flex-wrap'>
        {listFilterButton.map((button, index) => (
          <ButtonForm key={index} variant='outlined' className='rounded-3xl mt-2' onClick={() => onClickFilter()}>
            {button.label}
          </ButtonForm>
        ))}
      </Stack>
    </Stack>
  );
};

export default CommentFilterSection;
