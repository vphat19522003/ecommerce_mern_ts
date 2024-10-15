import { Link } from 'react-router-dom';

import { ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material';

import { RouteItemConfig } from '@app/types/route';

const SidebarItem = ({ item }: { item: RouteItemConfig }): JSX.Element => {
  return item.sidebarProps && item.path ? (
    <ListItemButton className='rounded-lg' disabled={item.disabled} component={Link} to={item.path}>
      {item.sidebarProps?.icon && <ListItemIcon className='text-pink-500'>{item.sidebarProps.icon}</ListItemIcon>}
      {item.sidebarProps?.displayText && (
        <ListItemText
          primary={
            <Typography
              // variant={'body'}
              fontSize={14}
              className='text-blue-700 -ml-6'
              sx={{
                alignSelf: 'center',
                fontWeight: 'bold',
                '&:hover': {
                  fontWeight: 'bold'
                }
              }}>
              {item.sidebarProps.displayText}
            </Typography>
          }
        />
      )}
    </ListItemButton>
  ) : (
    <></>
  );
};

export default SidebarItem;
