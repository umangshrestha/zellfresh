import Typography from '@mui/material/Typography';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import CategoriesSection from '../../components/Categories/CategoriesSection';
import { useCategories } from '../../components/Categories/Categories.hooks.ts';

export const HomePage = () => {
  const navigate = useNavigate();
  const {data} = useCategories();
  return (
    <React.Fragment>
      <Typography variant="h4" align="center" gutterBottom>
        Welcome to our store!
      </Typography>
      <Typography variant="body1" align="center" gutterBottom>
        Please select a category to get started
      </Typography>
     <CategoriesSection categories={data} onClick={navigate} />
    </React.Fragment>
  );
};
