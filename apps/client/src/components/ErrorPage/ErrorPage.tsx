import EmptyPage from '../ErrorComponent';

export const ErrorPage = () => (
  <EmptyPage
    title="Something went wrong"
    description={[
      "Don't worry, we're working on it and we'll get it fixed as soon as we can.",
      'If you need immediate assistance, please contact support.',
    ]}
    buttonText="Go to Support"
    image="/public/error.png"
    alt="Error"
    onClick={() => {}}
  />
);
