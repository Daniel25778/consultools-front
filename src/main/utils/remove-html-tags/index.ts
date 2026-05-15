export const removeHtmlTags = (text: string): string => {
  if (!text) return '';
  return text.replace(/<\/?[^>]+(?<temp1>>|$)/gu, '');
};
