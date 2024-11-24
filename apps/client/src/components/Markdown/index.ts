import { lazy } from 'react';
import {
  PrivacyPolicyMdFile,
  TermsAndConditionsMdFile,
} from './Markdown.config.ts';
import { withMarkdownFile } from './MarkdownFile.hoc.tsx';

const MarkdownComponent = lazy(() =>
  import('./Markdown.tsx').then((module) => ({ default: module.Markdown })),
);

export const TermsAndConditions = withMarkdownFile(
  MarkdownComponent,
  TermsAndConditionsMdFile,
);

export const PrivacyPolicy = withMarkdownFile(
  MarkdownComponent,
  PrivacyPolicyMdFile,
);
