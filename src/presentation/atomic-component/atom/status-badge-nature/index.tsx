import { Nature, natureTranslate } from 'domain/enums';
import type { FC } from 'react';

interface NatureBadgeProps {
  nature: Nature;
}

const natureStyles: Record<Nature, { bg: string; text: string }> = {
  [Nature.PLANNED]: {
    bg: 'bg-light-green',
    text: 'text-dark-green'
  },
  [Nature.UNPLANNED]: {
    bg: 'bg-gray-100',
    text: 'text-gray-700'
  }
};

export const NatureBadge: FC<NatureBadgeProps> = ({ nature }) => {
  const style = natureStyles[nature];

  return (
    <span
      className={`
        flex
        items-center
        gap-1
        min-w-min
        px-4
        py-1
        rounded-full
        text-base
        font-semibold
        ${style.bg}
        ${style.text}
      `}
    >
      {natureTranslate[nature]}
    </span>
  );
};
