import { Nature, natureTranslate } from 'domain/enums';

export const natureOptions = [
  { label: 'Filtrar por natureza', value: '' },
  { label: natureTranslate[Nature.PLANNED], value: Nature.PLANNED },
  { label: natureTranslate[Nature.UNPLANNED], value: Nature.UNPLANNED }
];
