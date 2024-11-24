import ErrorComponent from '../../components/ErrorComponent';

export const NotFoundPage = () => {
  return (
    <ErrorComponent
      title="Page not found"
      description={['The page you are looking for does not exist']}
      image={{
        alt: 'Page not found',
        url: '/images/not-found.png',
      }}
      cta={{
        text: 'Go to Home',
        to: '/',
      }}
    />
  );
};
