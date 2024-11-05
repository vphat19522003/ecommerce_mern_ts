import { Delete, Edit, LibraryAdd } from '@mui/icons-material';
import { IconButton, Stack, Tooltip } from '@mui/material';

import { CustomCategoryResponseType } from '@app/types/category';

type CategoryActionsProps = {
  handleDeleteCategory: (category: CustomCategoryResponseType) => void;
};

const CategoryActions = ({ handleDeleteCategory }: CategoryActionsProps) => {
  return (props: CustomCategoryResponseType): JSX.Element => {
    const handleDelete = () => {
      console.log('CATEGORY', props);
      handleDeleteCategory(props);
    };
    return (
      <Stack direction={'row'} justifyContent={'center'}>
        <Tooltip title='Add sub category'>
          <IconButton aria-label='edit' className='text-yellow-300' onClick={() => {}}>
            <LibraryAdd />
          </IconButton>
        </Tooltip>
        <Tooltip title='Edit category'>
          <IconButton aria-label='edit' className='text-blue-700' onClick={() => {}}>
            <Edit />
          </IconButton>
        </Tooltip>
        <Tooltip title='Delete category'>
          <IconButton aria-label='delete' className='text-pink-500' onClick={handleDelete}>
            <Delete />
          </IconButton>
        </Tooltip>
      </Stack>
    );
  };
};

export default CategoryActions;
