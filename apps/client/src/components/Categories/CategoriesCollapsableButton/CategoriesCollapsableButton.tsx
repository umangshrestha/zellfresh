import DinnerDiningIcon from '@mui/icons-material/DinnerDining';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import Collapse from '@mui/material/Collapse';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import React, { useState } from 'react';
import { CategoriesCollapsableButtonProps } from './CategoriesCollapsableButton.types.ts';

export const CategoriesCollapsableButton = ({
  onClick,
  categories,
}: CategoriesCollapsableButtonProps) => {
  const [productsOpen, setProductsOpen] = useState(true);

  return (
    <React.Fragment>
      <ListItemButton
        className="w-full"
        onClick={() => setProductsOpen((prev) => !prev)}
      >
        <ListItemIcon>
          <DinnerDiningIcon />
        </ListItemIcon>
        <ListItemText primary="Product" />
        {productsOpen ? <KeyboardArrowDownIcon /> : <KeyboardArrowRightIcon />}
      </ListItemButton>
      <Collapse
        className="w-full"
        in={productsOpen}
        timeout="auto"
        unmountOnExit
      >
        <List component="div" disablePadding>
          {categories.map(({ name, icon, navigateUrl, isAvailable }) => (
            <ListItemButton
              sx={{
                pl: 4,
              }}
              disabled={isAvailable}
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