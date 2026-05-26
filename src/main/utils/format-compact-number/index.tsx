export const formatCompactNumber = (value?: number): string => {
  return new Intl.NumberFormat('pt-BR', {
    notation: 'compact',
    compactDisplay: 'short',
    maximumFractionDigits: 1
  }).format(Number(value ?? 0));
};
