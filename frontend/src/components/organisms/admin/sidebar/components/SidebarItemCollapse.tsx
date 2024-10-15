import { useState } from 'react';
import { Link } from 'react-router-dom';

import { Box, Collapse, List, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material';

import { RouteItemConfig } from '@app/types/route';

import SidebarItem from './SidebarItem';

const SidebarItemCollapse = ({ item }: { item: RouteItemConfig }): JSX.Element => {
  const [open, setOpen] = useState(false);
  return (
    <Box
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => {
        setOpen(false);
      }}>
      <ListItemButton className='rounded-lg' disabled={item.disabled} component={Link} to={item.path}>
        {item.sidebarProps?.icon && <ListItemIcon className='text-pink-500'>{item.sidebarProps.icon}</ListItemIcon>}
        {item.sidebarProps?.displayText && (
          <ListItemText
            primary={
              <Typography
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
      <Collapse in={open} timeout={500} unmountOnExit>
        <List
          component='div'
          disablePadding
          sx={{
            position: 'relative',
            '&:after': {
              content: '""',
              position: 'absolute',
              left: '2rem',
              top: 0,
              height: '100%',
              width: '1px',
              opacity: 0.25,
              background: '#5684BF'
            }
          }}>
          <Box sx={{ ml: '2rem' }}>
            {item.child?.map((route, index) =>
              route.sidebarProps ? (
                route.child ? (
                  <SidebarItemCollapse item={route} key={index} />
                ) : (
                  <SidebarItem item={route} key={index} />
                )
              ) : null
            )}
          </Box>
        </List>
      </Collapse>
    </Box>
  );
};

export default SidebarItemCollapse;
