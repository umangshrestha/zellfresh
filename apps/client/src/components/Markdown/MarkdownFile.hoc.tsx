import axios from 'axios';
import { ComponentType, useEffect, useState } from 'react';
import { MarkdownProps } from './Markdown.types.ts';

export const withMarkdownFile = (
  WrappedComponent: ComponentType<MarkdownProps>,
  path: string,
) => {
  return () => {
    const [data, setData] = useState('');
    const [error, setError] = useState<Error | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
      if (loading || data) return;
      setLoading(true);
      const abortController = new AbortController();
      axios
        .get(path, { signal: abortController.signal })
        .then((response) => {
          setData(response.data);
        })
        .catch((error) => {
          if (axios.isCancel(error)) return;
          setError(error as Error);
        })
        .finally(() => {
          setLoading(false);
        });
      return () => {
        abortController.abort();
      };
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return <WrappedComponent data={data} loading={loading} error={error} />;
  };
};
