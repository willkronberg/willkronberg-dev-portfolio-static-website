declare module '*.svg' {
  // eslint-disable-next-line no-unused-vars
  import React = require('react');
  export const ReactComponent: React.SFC<React.SVGProps<SVGSVGElement>>;
  const src: string;
  export default src;
}

declare module '*.md' {
  const content: string;
  export = content;
}
