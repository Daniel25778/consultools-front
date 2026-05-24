export enum Nature {
  PLANNED = 'PLANNED',
  UNPLANNED = 'UNPLANNED'
}

export const natureTranslate: Record<Nature, string> = {
  [Nature.PLANNED]: 'Planejado',
  [Nature.UNPLANNED]: 'Não Planejado'
};
