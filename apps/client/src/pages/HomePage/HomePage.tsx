import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import ImageButton from '../../components/ImageButton';
import { SUPPORTED_PRODUCTS } from '../../config/products.ts';

export const HomePage = () => {
  const navigate = useNavigate();
  return (
    <React.Fragment>
      <Typography variant="h4" align="center" gutterBottom>
        Welcome to our store!
      </Typography>
      <Typography variant="body1" align="center" gutterBottom>
        Please select a category to get started
      </Typography>
      <Box
        sx={{ display: 'flex', flexWrap: 'wrap', minWidth: 300, width: '100%' }}
      >
        {SUPPORTED_PRODUCTS.map((product) => (
          <ImageButton
            {...product}
            onClick={() => navigate(product.url)}
            key={product.name}
          />
        ))}
      </Box>
    </React.Fragment>
  );
};
