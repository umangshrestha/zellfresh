import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';
import SplitButton from '../../SplitButton';
import { ProuctOrderOptions } from './ProductFilter.config';
import { useProductFilter } from './ProductFilter.hooks';
import { ProductPageOrderBy } from './ProductFilter.types';

const LowestPrice = 0;
const HighestPrice = 100;

function priceText(value: number) {
  return `${value}°C`;
}

export const ProductFilter = () => {
  const { productFilter, updateProductFilter } = useProductFilter();

  return (
    <Box sx={{ overflow: 'auto', p: 2, maxWidth: 300 }}>
      <Typography variant="h6">Price</Typography>
      <Slider
        getAriaLabel={() => 'Price range'}
        value={[productFilter.minPrice || 0, productFilter.maxPrice || 1000]}
        onChange={(_, newValue) => {
          if (Array.isArray(newValue))
            updateProductFilter({
              minPrice: newValue[0],
              maxPrice: newValue[1],
            });
        }}
        step={10}
        min={LowestPrice}
        max={HighestPrice}
        valueLabelDisplay="auto"
        getAriaValueText={priceText}
        disableSwap
      />
      <Divider />
      <SplitButton
        options={ProuctOrderOptions}
        onClick={(options: ProductPageOrderBy) =>
          updateProductFilter({
            ...options,
          })
        }
      />
    </Box>
  );
};
