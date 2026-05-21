import { Status, statusTranslate } from 'domain/enums';

type StatusBadgeProps = {
  status: Status;
};

const statusStyles: Record<Status, { bg: string; text: string }> = {
  [Status.ENABLED]: {
    bg: 'bg-light-green',
    text: 'text-dark-green'
  },

  [Status.DISABLED]: {
    bg: 'bg-gray-100',
    text: 'text-gray-700'
  },

  [Status.EXPIRED]: {
    bg: 'bg-yellowLight',
    text: 'text-yellowDark'
  }
};

export const StatusBadge = ({ status }: StatusBadgeProps) => {
  const style = statusStyles[status];

  return (
    <span
      className={`
        flex
        max-w-min
        px-5
        py-1
        rounded-full
        text-base
        font-semibold
        
        ${style.bg}
        ${style.text}
      `}
    >
      {statusTranslate[status]}
    </span>
  );
};
