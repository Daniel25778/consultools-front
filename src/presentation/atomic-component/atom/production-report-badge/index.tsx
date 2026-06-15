import { InfoOutline } from '@mui/icons-material';

type ProductionReportBadgeProps = {
  finishedAt: Date | null;
};

export const ProductionReportBadge = ({ finishedAt }: ProductionReportBadgeProps) => {
  const style = {
    bg: finishedAt ? 'bg-light-green' : 'bg-gray-100',
    text: finishedAt ? 'text-dark-green' : 'text-gray-700'
  };

  //  bg: 'bg-yellowLight',
  //   text: 'text-yellowDark'

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
      {!finishedAt && <InfoOutline sx={{ fontSize: 18 }} />}
      {finishedAt ? 'Finalizado' : 'Não finalizado'}
    </span>
  );
};
