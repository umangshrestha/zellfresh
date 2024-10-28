import js from '@eslint/js';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import globals from 'globals';
import tseslint from 'typescript-eslint';

const REACT_MUI_COMPONENTS = [
    'AppBar', 'Avatar', 'Backdrop', 'Badge', 'BottomNavigation', 'BottomNavigationAction', 'Box', 'Breadcrumbs', 'Button',
    'ButtonBase', 'ButtonGroup', 'Card', 'CardActionArea', 'CardActions', 'CardContent', 'CardHeader', 'CardMedia',
    'Checkbox', 'Chip', 'CircularProgress', 'ClickAwayListener', 'Collapse', 'Container', 'CssBaseline', 'Dialog', 'DialogActions',
    'DialogContent', 'DialogContentText', 'DialogTitle', 'Divider', 'Drawer', 'Fab', 'Fade', 'FilledInput', 'FormControl',
    'FormControlLabel', 'FormGroup', 'FormHelperText', 'FormLabel', 'Grid', 'Grow', 'Hidden', 'IconButton', 'ImageList',
    'ImageListItem', 'ImageListItemBar', 'Input', 'InputAdornment', 'InputBase', 'InputLabel', 'LinearProgress', 'Link',
    'List', 'ListItem', 'ListItemAvatar', 'ListItemIcon', 'ListItemSecondaryAction', 'ListItemText', 'ListSubheader', 'Menu',
    'MenuItem', 'MenuList', 'MobileStepper', 'Modal', 'NativeSelect', 'OutlinedInput', 'Pagination', 'PaginationItem', 'Paper',
    'Popover', 'Popper', 'Radio', 'RadioGroup', 'Rating', 'ScopedCssBaseline', 'Select', 'Skeleton', 'Slide', 'Slider', 'Snackbar',
    'SnackbarContent', 'SpeedDial', 'SpeedDialAction', 'SpeedDialIcon', 'Stack', 'Step', 'StepButton', 'StepConnector', 'StepContent',
    'StepIcon', 'StepLabel', 'Stepper', 'SvgIcon', 'SwipeableDrawer', 'Switch', 'Tab', 'Table', 'TableBody', 'TableCell',
    'TableContainer', 'TableFooter', 'TableHead', 'TablePagination', 'TableRow', 'TableSortLabel', 'Tabs', 'TabScrollButton', 'TextField',
    'ToggleButton', 'ToggleButtonGroup', 'Toolbar', 'Tooltip', 'Typography', 'useMediaQuery', 'useScrollTrigger', 'Zoom'
]
export default tseslint.config(
  { ignores: ['dist', 'src/__generated__'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      'no-restricted-imports': [
        'error',
        {
          patterns: ['@mui/*/*/*'],
          paths: [
            {
              name: '@mui/material',
              importNames: REACT_MUI_COMPONENTS,
              message:
                'Please use \'import Box from "@mui/material/[ComponentName]\' instead.',
            },
          ],
        },
      ],
    },
  },
);
