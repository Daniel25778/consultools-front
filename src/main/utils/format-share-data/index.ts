const removeHtmlTags = (text: string): string => {
  return text
    .replace(/<\/tr>/gu, '\n')
    .replace(/<\/th>/gu, ' | ')
    .replace(/<\/td>/gu, ' | ')
    .replace(/<\/[^>]+>/gu, '\n\n')
    .replace(/<\/[^>]+>/gu, '')
    .replace(/<[^>]+>/gu, '')
    .replace(/\n\s+\| /gu, '\n')
    .replace(/\| \s+\| /gu, '| ')
    .replace(/(?<temp1>\| \s)+\|/gu, '|');
};

export const formatShareData = (data: string[]): string =>
  data.map((item) => `${removeHtmlTags(item)}\n\n`).join('');

export const formatHtmlData = (data: (string | { tag: string; text: string })[]): string => `
<div style="display:flex;flex-direction:column;">
${data
  .map((item) => {
    if (typeof item === 'string') {
      if (item.startsWith('<')) return item;
      return `<p>${item}</p>`;
    }
    return `<${item.tag}>${item.text}</${item.tag}>`;
  })
  .join('')}
</div>`;
