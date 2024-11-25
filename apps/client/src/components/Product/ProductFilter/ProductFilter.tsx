import FilterListIcon from '@mui/icons-material/FilterList';
import FilterListOffIcon from '@mui/icons-material/FilterListOff';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Categories from '../../Categories';
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
  const [showFilter, setShowFilter] = useState(false);
  const navigate = useNavigate();

  if (showFilter)
    return (
      <FilterListOffIcon
        className="mt-4"
        onClick={() => setShowFilter(false)}
        sx={{ cursor: 'pointer' }}
      />
    );
  return (
    <div className="flex flex-col mt-4 w-64">
      <div className="flex gap-6">
        <FilterListIcon
          onClick={() => setShowFilter(true)}
          sx={{ cursor: 'pointer' }}
        />
        <Typography variant="h6"> Product Filter</Typography>
      </div>
      <List>
        <ListItem className="flex flex-col p-0 m-0">
          <Categories.CollapsableButton onClick={navigate} />
        </ListItem>
        <ListItem>
          <SplitButton
            options={ProductOrderOptions}
            onClick={(options: ProductPageOrderBy) =>
              updateProductFilter({
                ...options,
              })
            }
          />
        </ListItem>
        <ListItem>
          <FormControlLabel
            label="Out of stock?"
            labelPlacement="start"
            control={
              <Checkbox
                id="showOutOfStock"
                checked={productFilter?.showOutOfStock || false}
                onChange={() =>
                  updateProductFilter({
                    showOutOfStock: !productFilter?.showOutOfStock,
                  })
                }
              />
            }
          />
        </ListItem>
        <ListItem className="flex flex-col">
          <ListItemText>Rating range</ListItemText>
          <Slider
            getAriaLabel={() => 'Rating range'}
            value={[
              productFilter?.minRating || 0,
              productFilter?.maxRating || 5,
            ]}
            onChange={(_, newValue) => {
              if (Array.isArray(newValue))
                updateProductFilter({
                  minRating: newValue[0],
                  maxRating: newValue[1],
                });
            }}
            step={1}
            min={0}
            max={5}
            valueLabelDisplay="auto"
            getAriaValueText={priceText}
            disableSwap
          />
        </ListItem>
        <ListItem className="flex flex-col">
          <ListItemText>Price range</ListItemText>
          <Slider
            getAriaLabel={() => 'Price range'}
            value={[
              productFilter?.minPrice || 0,
              productFilter?.maxPrice || 1000,
            ]}
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
        </ListItem>
      </List>
    </div>
  );
};
