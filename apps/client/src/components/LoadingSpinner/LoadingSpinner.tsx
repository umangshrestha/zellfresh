import CircularProgress from '@mui/material/CircularProgress';

export const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center h-64">
      <CircularProgress
        size={50}
        thickness={5}
      />
    </div>
  );
}