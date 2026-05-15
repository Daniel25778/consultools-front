import type { FC } from 'react';

interface HeadingProps {
  text: string;
  hideTitle?: boolean;
}

export const FormateHtml: FC<HeadingProps> = ({ text, hideTitle }) => (
  <span
    className={'format-class'}
    dangerouslySetInnerHTML={{ __html: text }}
    id={'format-class'}
    title={
      hideTitle ? undefined : text?.replace(/<\/?[^>]+(?<temp1>>|$)/gu, '')
    }
  />
);
