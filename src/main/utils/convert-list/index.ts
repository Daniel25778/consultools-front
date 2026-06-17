import type { SelectValues } from 'presentation/atomic-component/atom/select';

export const listToSelect = (
  list: { id: number | string; name?: number | string; fieldName?: string }[],
  field?: string,
  firstItem?: { id: number | string; name?: number | string; fieldName?: string }
): SelectValues[] => [
  ...(firstItem
    ? [
        {
          label: field ? String(firstItem[field as 'fieldName']) : String(firstItem.name),
          value: String(firstItem.id)
        }
      ]
    : []),
  ...list
    .filter((item) => item.id !== firstItem?.id)
    .map((item) => ({
      label: field ? String(item[field as 'fieldName']) : String(item.name),
      value: String(item.id)
    }))
];

export const formatObjectToSelect = (object: Record<string, string>): SelectValues[] => {
  return Object.entries(object)?.map(([value, label]) => ({ label, value })) ?? [];
};
