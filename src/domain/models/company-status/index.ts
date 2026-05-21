import { Status, statusTranslate } from 'domain/enums';

export const companyStatusOptions = [
  { label: 'Filtrar por status', value: '' },
  { label: statusTranslate[Status.ENABLED], value: Status.ENABLED },
  { label: statusTranslate[Status.DISABLED], value: Status.DISABLED },
  { label: statusTranslate[Status.EXPIRED], value: Status.EXPIRED }
];
