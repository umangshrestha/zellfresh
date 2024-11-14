import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCategories } from '../../components/Categories/Categories.hooks.ts';
import CategoriesSection from '../../components/Categories/CategoriesSection';

export const HomePage = () => {
  const navigate = useNavigate();
  const { data } = useCategories();
  return (
    <React.Fragment>
      <Box display="flex" flexDirection="column" alignItems="center">
        <img
          src="/welcome.png"
          alt="chicken waving welcome"
          width="150"
          loading="lazy"
        />
        <Typography variant="h4" align="center" gutterBottom>
          Welcome to our store!
        </Typography>
        <Typography variant="body1" align="center" gutterBottom>
          Please select a category to get started
        </Typography>
      </Box>
      <CategoriesSection categories={data} onClick={navigate} />
    </React.Fragment>
  );
};
