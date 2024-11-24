import { To } from 'react-router-dom';

export interface ErrorComponentProps {
  title: string;
  description: string[];
  image?: {
    url: string;
    alt: string;
  };
  cta?: {
    text: string;
    to: To;
  };
}
