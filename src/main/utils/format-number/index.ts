export const formatNumberMin = (value: number): string => {
  if (value >= 1_000_000_000) return `${(value / 1_000_000_000).toFixed(1).replace('.', ',')} bi`;

  if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(1).replace('.', ',')} mi`;

  if (value >= 1_000) return `${(value / 1_000).toFixed(0)} mil`;

  return value.toString();
};

export const formatNumber = (value?: number, fixed?: number): string => {
  return new Intl.NumberFormat('pt-BR', {
    maximumFractionDigits: fixed ?? 2,
    minimumFractionDigits: fixed ?? 2
  }).format(isNaN(Number(value)) ? 0 : Number(value));
};

export const formatMoney = (value?: number): string => {
  return `R$ ${new Intl.NumberFormat('pt-BR', {
    currency: 'BRL',
    maximumFractionDigits: 2,
    minimumFractionDigits: 2
  }).format(isNaN(Number(value)) ? 0 : Number(value))}`;
};

export const formatDuration = (ms: number): string => {
  const totalSeconds = Math.floor(ms / 1000);
  const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
  const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
  const seconds = String(totalSeconds % 60).padStart(2, '0');

  return `${hours}:${minutes}:${seconds}`;
};
