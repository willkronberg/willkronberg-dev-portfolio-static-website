import React from 'react';
import ReactMarkdown, { MarkdownOptions } from 'markdown-to-jsx';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

const options = {
  overrides: {
    h1: {
      component: Typography,
      props: {
        gutterBottom: true,
        variant: 'h5',
      },
    },
    h2: { component: Typography, props: { gutterBottom: true, variant: 'h6' } },
    h3: { component: Typography, props: { gutterBottom: true, variant: 'subtitle1' } },
    h4: {
      component: Typography,
      props: { gutterBottom: true, variant: 'caption', paragraph: true },
    },
    p: { component: Typography, props: { paragraph: true } },
    a: { component: Link },
    li: { component: Typography },
  },
};

export default function Markdown(props: MarkdownProps) {
  return <ReactMarkdown options={options} {...props} />;
}

interface MarkdownProps extends React.HTMLAttributes<HTMLElement> {
  options?: MarkdownOptions;
  children?: React.ReactNode;
}
