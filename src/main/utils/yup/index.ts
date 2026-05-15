export const validatePhone = (userPhone: string | null): boolean => {
  let phone = userPhone;

  if (phone === null) return true;

  phone = phone.replace(/[^\d]/gu, '');

  if (phone?.split('')?.[2] === '9' && phone.length === 11) return true;

  if (phone.length === 10 || phone.length === 11) return true;

  return false;
};

export const validateCnpj = (text: string): boolean => {
  if (!text) return false;
  const cnpj = text.replace(/\D/gu, '');

  if (cnpj.length !== 14) return false;
  if (/^(?<temp1>\d)\1{13}$/u.test(cnpj)) return false;

  const calc = (base: string): number => {
    const pesos = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
    const sum = base
      .split('')
      .reduce((acc, dig, i) => acc + Number(dig) * pesos[pesos.length - base.length + i], 0);
    const rest = sum % 11;

    return rest < 2 ? 0 : 11 - rest;
  };

  const base12 = cnpj.slice(0, 12);
  const d1 = calc(base12);
  const d2 = calc(base12 + d1);

  return cnpj.endsWith(`${d1}${d2}`);
};
