import DinnerDiningIcon from '@mui/icons-material/DinnerDining';
import Collapse from '@mui/material/Collapse';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import React, { useState } from 'react';
import { CategoriesCollapsableButtonProps } from './CategoriesCollapsableButton.types.ts';

export const CategoriesCollapsableButton = ({
  showText,
  onClick,
  categories,
}: CategoriesCollapsableButtonProps) => {
  const [productsOpen, setProductsOpen] = useState(true);

  return (
    <React.Fragment>
      <ListItemButton
        sx={{
          pl: 2,
        }}
        onClick={() => setProductsOpen((prev) => !prev)}
      >
        <ListItemIcon
          sx={{
            minWidth: 'auto',
            mr: 2,
          }}
        >
          <DinnerDiningIcon />
        </ListItemIcon>
        <ListItemText
          primary="Product"
          sx={{
            opacity: showText ? 1 : 0,
          }}
        />
      </ListItemButton>
      <Collapse in={productsOpen} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {categories.map(({ name, icon, navigateUrl }) => (
            <ListItemButton
              sx={{
                pl: 4,
              }}
              key={name}
              onClick={() => {
                onClick(navigateUrl);
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 'auto',
                  mr: 2,
                }}
              >
                {icon}
              </ListItemIcon>
              <ListItemText primary={name} />
            </ListItemButton>
          ))}
        </List>
      </Collapse>
    </React.Fragment>
  );
};
