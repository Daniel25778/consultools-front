import { Info } from '@mui/icons-material';
import { Tooltip } from '@mui/material';
import { Status, statusTranslate } from 'domain/enums';

type StatusBadgeProps = {
  status?: Status;
  finished?: boolean;
  tooltipMessage?: string;
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

export const StatusBadge = ({ status, finished, tooltipMessage }: StatusBadgeProps) => {
  const isFinishedDefined = status === undefined;

  const currentStatus = isFinishedDefined
    ? finished
      ? Status.ENABLED
      : Status.DISABLED
    : (status ?? Status.DISABLED);

  const style = statusStyles[currentStatus];

  const label = isFinishedDefined
    ? finished
      ? 'Finalizado'
      : 'Não finalizado'
    : statusTranslate[currentStatus];

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
      {!finished && isFinishedDefined && (
        <Tooltip title={tooltipMessage}>
          <Info sx={{ fontSize: 18 }} />
        </Tooltip>
      )}
      {label}
    </span>
  );
};
