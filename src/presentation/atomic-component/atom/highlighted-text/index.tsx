import type { FC } from 'react';

interface HighlightedTextProps {
  text: string;
  search: string;
}

const createAccentInsensitiveRegex = (search: string): RegExp => {
  const accentsMap: Record<string, string> = {
    a: '[aàáâãäå]',
    c: '[cç]',
    e: '[eèéêë]',
    i: '[iìíîï]',
    n: '[nñ]',
    o: '[oòóôõö]',
    u: '[uùúûü]',
  };

  const escapedSearch = search.replace(/[aeiounc]/giu, (char) => {
    const lowerChar = char.toLowerCase();

    return accentsMap[lowerChar] || char;
  });

  return new RegExp(escapedSearch, 'giu');
};

export const HighlightedText: FC<HighlightedTextProps> = ({ text, search }) => {
  const regex = createAccentInsensitiveRegex(search);

  const highlightedName = text.replace(regex, (match) => {
    return `<span style="background-color:yellow;">${match}</span>`;
  });

  return <span dangerouslySetInnerHTML={{ __html: highlightedName }} />;
};
