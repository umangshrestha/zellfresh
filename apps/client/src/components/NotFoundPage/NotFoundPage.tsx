import { useNavigate } from 'react-router-dom';
import ErrorComponent from '../ErrorComponent';

export const NotFoundPage = () => {
  const navigate = useNavigate();
  return (
    <ErrorComponent
      title="Page not found"
      alt="Page not found"
      description={['The page you are looking for does not exist']}
      buttonText="Go back"
      image="/not-found.png"
      onClick={() => navigate(-1)}
    />
  );
};
