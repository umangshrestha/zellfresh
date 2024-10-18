import { useNavigate } from 'react-router-dom';
import EmptyPage from '../EmptyPage';

export const NotFoundPage = () => {
  const navigate = useNavigate();
  return (
    <EmptyPage
      title="Page not found"
      alt="Page not found"
      description={['The page you are looking for does not exist']}
      buttonText="Go back"
      image="/public/not-found.png"
      onClick={() => navigate(-1)}
    />
  );
};
