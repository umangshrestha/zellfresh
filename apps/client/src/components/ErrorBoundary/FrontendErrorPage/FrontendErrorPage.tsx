import ErrorComponent from '@/components/ErrorComponent';

export const FrontendErrorPage = () => (
  <ErrorComponent
    title="Something went wrong"
    description={[
      "Don't worry, we're working on it and we'll get it fixed as soon as we can.",
      'If you need immediate assistance, please contact support.',
    ]}
    image={{
      url: '/images/error.png',
      alt: 'Error',
    }}
    cta={{
      text: 'Go to Support',
      to: '/contact',
    }}
  />
);
