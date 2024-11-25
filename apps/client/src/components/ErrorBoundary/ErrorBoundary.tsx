import React, { Component, Suspense } from 'react';
import { LayoutProps as ErrorBoundaryProps } from '../Layout';
import { ErrorBoundaryState } from './ErrorBoundary.types';
import ErrorPage from './FrontendErrorPage';

export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    console.log('ErrorBoundary getDerivedStateFromError', error);
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <Suspense fallback={<div>Loading...</div>}>
          <ErrorPage />
        </Suspense>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
