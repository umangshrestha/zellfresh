import Box from '@mui/material/Box';
import ImageButton from '../../ImageButton';
import { WithCategoriesProps as CategoriesSectionProps } from '../Categories.types.ts';

export const CategoriesSection = ({
  navigateTo,
  categories,
}: CategoriesSectionProps) => (
  <Box
    sx={{
      display: 'flex',
      justifyContent: 'center',
      flexWrap: 'wrap',
      minWidth: 300,
      width: '100%',
    }}
  >
    {categories.map((category) => (
      <ImageButton
      width='44%'
        {...category}
        onClick={() => navigateTo(category.navigateUrl)}
        key={category.name}
      />
    ))}
  </Box>
);
