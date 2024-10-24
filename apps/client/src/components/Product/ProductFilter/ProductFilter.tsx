import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import Slider from '@mui/material/Slider';
import SplitButton from '../../SplitButton';
import { ProuctOrderOptions } from './ProductFilter.config';
import { useProductFilter } from './ProductFilter.hooks';
import { ProductFilterProps, ProductPageOrderBy } from './ProductFilter.types';

const LowestPrice = 0;
const HighestPrice = 100;
function priceText(value: number) {
  return `${value}°C`;
}

export const ProductFilter = ({ maxPrice }: ProductFilterProps) => {
  const { params, updateParams } = useProductFilter();

  return (
    <Drawer anchor="left" open={true} variant="persistent">
      <Slider
        getAriaLabel={() => 'Price range'}
        value={[params.minPrice || 0, params.maxPrice || maxPrice]}
        onChange={(_, newValue) => {
          if (Array.isArray(newValue))
            updateParams({ minPrice: newValue[0], maxPrice: newValue[1] });
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
          updateParams({
            ...options,
          })
        }
      />
    </Drawer>
  );
};
