import { type FC, useEffect, useState } from 'react';

interface TimeAgoProps {
  date: Date;
}

const convertHour = (date: Date): string => {
  const offsetUTC3 = -180;
  const adjustedDate = new Date(
    new Date(date).getTime() + offsetUTC3 * 60 * 1000,
  );
  const now = new Date();
  const adjustedNow = new Date(now.getTime() + offsetUTC3 * 60 * 1000);

  const diffInMilliseconds = adjustedNow.getTime() - adjustedDate.getTime();
  const diffInMinutes = Math.floor(diffInMilliseconds / (1000 * 60));
  const diffInHours = Math.floor(diffInMilliseconds / (1000 * 60 * 60));
  const diffInDays = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24));

  if (diffInDays >= 1)
    return new Intl.DateTimeFormat('pt-BR', {
      dateStyle: 'short',
      timeStyle: 'short',
      timeZone: 'America/Sao_Paulo',
    }).format(adjustedDate);

  if (diffInHours >= 1) return `${diffInHours} horas atrás`;
  return `${diffInMinutes === 0 ? 1 : diffInMinutes} minutos atrás`;
};

export const TimeAgo: FC<TimeAgoProps> = ({ date }) => {
  const [timeAgo, setTimeAgo] = useState(convertHour(date));

  useEffect(() => {
    const interval = timeAgo.includes('minutos')
      ? 60000
      : timeAgo.includes('horas')
        ? 3600000
        : null;

    if (interval) {
      const timer = setInterval(() => {
        setTimeAgo(convertHour(date));
      }, interval);

      return () => clearInterval(timer);
    }
  }, [timeAgo, date]);

  return <span>{date === null ? '-' : timeAgo}</span>;
};
