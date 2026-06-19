import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export const formatDate = (
  date: Date | string | null,
  formatType?: string,
  formatToUTC = true
): string => {
  try {
    if (date === null) return '-';

    let newDate = date;

    if (typeof date === 'string' && formatToUTC) {
      newDate = date.includes('T') ? date.replace('T', ' ') : `${date.slice(0, 10)} 00:00:00`;
    }

    return format(new Date(newDate), formatType ?? "dd 'de' MMMM 'de' yyyy", {
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
