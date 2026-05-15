type formatTypes = 'cep' | 'cnpj' | 'cpf' | 'phone';

export const formatText = (text: string | null | undefined, type: formatTypes): string => {
  if (text) {
    const numberText = text.replace(/\D/gu, '');

    if (type === 'cnpj')
      return `${numberText.slice(0, 2)}.${numberText.slice(2, 5)}.${numberText.slice(
        5,
        8
      )}/${numberText.slice(8, 12)}-${numberText.slice(12, 14)}`;

    if (type === 'phone')
      return `(${numberText.slice(0, 2)})  ${
        numberText.length === 11
          ? `${numberText.slice(2, 7)}-${numberText.slice(7)}`
          : `${numberText.slice(2, 6)}-${numberText.slice(6)}`
      }`;

    if (type === 'cpf')
      return `${numberText.slice(0, 3)}.${numberText.slice(3, 6)}.${numberText.slice(
        6,
        9
      )}-${numberText.slice(9, 11)}`;

    if (type === 'cep') return `${numberText.slice(0, 5)}-${numberText.slice(5)}`;

    return text;
  }

  return '';
};
