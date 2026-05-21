export enum Status {
  ENABLED = 'ENABLED',
  DISABLED = 'DISABLED',
  EXPIRED = 'EXPIRED'
}

export const statusTranslate: Record<Status, string> = {
  [Status.ENABLED]: 'Habilitado',
  [Status.DISABLED]: 'Desabilitado',
  [Status.EXPIRED]: 'Expirado'
};
