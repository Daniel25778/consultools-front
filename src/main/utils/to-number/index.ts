export const toNumber = (num: unknown): number | undefined => {
  const number = String(num)?.replace(',', '.');

  return isNaN(Number(number)) ? undefined : Number(number);
};
