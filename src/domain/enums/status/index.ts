export enum Status {
  ENABLED = 'ENABLED',
  DISABLED = 'DISABLED'
}

export const statusTranslate: Record<Status, string> = {
  [Status.ENABLED]: 'Habilitado',
  [Status.DISABLED]: 'Desabilitado'
};
