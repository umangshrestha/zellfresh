import ErrorComponent from '../ErrorComponent';
import { ServerErrorComponentProps } from './ServerErrorComponent.types.ts';

export const ServerErrorComponent = ({ error }: ServerErrorComponentProps) => {
  const description = [];
  description.push(error.message);

  return (
    <ErrorComponent
      title={error.name}
      description={description}
      image={{
        url: '/images/random-error.png',
        alt: 'Error',
      }}
      cta={{
        text: 'Go to home',
        to: '/',
      }}
    />
  );
};
