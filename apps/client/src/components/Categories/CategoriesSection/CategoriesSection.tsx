import Box from '@mui/material/Box';
import ImageButton from '../../ImageButton';
import type { CategoriesSectionProps } from './CategoriesSection.types.ts';

export const CategoriesSection = ({
  onClick,
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
        {...category}
        onClick={() => onClick(category.navigateUrl)}
        key={category.name}
      />
    ))}
  </Box>
);
