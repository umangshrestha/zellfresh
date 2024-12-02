import HomeIcon from '@mui/icons-material/Home';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import MuiBreadcrumbs from '@mui/material/Breadcrumbs';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import { useLocation, useNavigate } from 'react-router-dom';

export const Breadcrumbs = () => {
  const location = useLocation();
  const pathNames = location.pathname.split('/').filter((x) => x);
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const category = searchParams.get('category');
  return (
    <div className="flex w-full justify-between">
      <MuiBreadcrumbs
        color="inherit"
        className="p-4"
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumb"
      >
        <Link underline="hover" key="1" color="inherit" href="/">
          <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
        </Link>
        {pathNames.map((name, index) => (
          <Link
            underline="hover"
            key={`{name}-${index}`}
            color="inherit"
            onClick={() => {
              const url = pathNames.slice(0, index + 1).join('/');
              navigate(url);
            }}
          >
            {name}
          </Link>
        ))}
        {category && pathNames[0] === 'products' && (
          <Link
            underline="hover"
            key="category"
            color="inherit"
            onClick={() => {
              const url = pathNames.join('/');
              navigate(`/${url}?category=${category}`);
            }}
          >
            {category}
          </Link>
        )}
      </MuiBreadcrumbs>
      <Button disabled={pathNames.length === 0} onClick={() => navigate(-1)}>
        Go back
      </Button>
    </div>
  );
};
