import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';
import SplitButton from '../../SplitButton';
import { ProductOrderOptions } from './ProductFilter.config';
import { useProductFilter } from './ProductFilter.hooks';
import { ProductPageOrderBy } from './ProductFilter.types';

const LowestPrice = 0;
const HighestPrice = 1000;

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
      <SplitButton
        options={ProductOrderOptions}
        onClick={(options: ProductPageOrderBy) =>
          updateProductFilter({
            ...options,
          })
        }
      />
      <FormControlLabel
        label="In stock"
        control={
          <Checkbox
            checked={productFilter.showOutOfStock || false}
            onChange={() =>
              updateProductFilter({
                showOutOfStock: !productFilter.showOutOfStock,
              })
            }
          />
        }
      />
    </Box>
  );
};
