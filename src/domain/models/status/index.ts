import { Status, statusTranslate } from 'domain/enums';

export const statusOptions = [
  { label: 'Filtrar por status', value: '' },
  { label: statusTranslate[Status.ENABLED], value: Status.ENABLED },
  { label: statusTranslate[Status.DISABLED], value: Status.DISABLED }
];
