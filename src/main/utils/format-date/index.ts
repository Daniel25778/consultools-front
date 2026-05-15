import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export const formatDate = (
  date: Date | string | null,
  formatType?: string,
  formatToUTC = true
): string => {
  try {
    if (date === null) return '-';

    const newDate =
      typeof date === 'string' && formatToUTC ? `${date?.slice(0, 10)} 04:00:00` : date;

    return format(new Date(newDate ?? null), formatType ?? 'dd/MM/yyyy', {
      locale: ptBR
    });
  } catch {
    return '';
  }
};

export const formatHour = (date?: string | null): string => {
  if (!date) return '';

  return String(date)?.slice(0, 5);
};

export const subtractMonths = (date: Date, months: number): Date => {
  const newDate = new Date(date);

  newDate.setMonth(newDate.getMonth() - months);

  if (newDate.getDate() !== date.getDate()) newDate.setDate(0);

  return newDate;
};
