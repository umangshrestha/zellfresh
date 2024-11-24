import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { ServerErrorComponent } from '../ServerErrorComponent/ServerErrorComponent.tsx';
import './Markdown.css';
import { MarkdownProps } from './Markdown.types.ts';
import MarkdownLoadingComponent from './MarkdownSkeleton';

export const Markdown = ({ data, loading, error }: MarkdownProps) => {
  if (loading) return <MarkdownLoadingComponent />;

  if (error) return <ServerErrorComponent error={error} />;

  window.scroll(0, 0);
  return (
    <div className="markdown-content">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{data}</ReactMarkdown>
    </div>
  );
};
