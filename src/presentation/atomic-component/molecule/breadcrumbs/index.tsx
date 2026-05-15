import { Breadcrumbs as MuiBreadcrumbs } from '@mui/material';
import { usePath } from 'data/hooks';
import type { ReplaceMap } from 'main/mock';
import { wordsToReplace } from 'main/mock';
import { colors } from 'presentation/style';
import type { FC } from 'react';
import { Link } from 'react-router-dom';

interface BreadcrumbsProps {
  removeItems?: string[];
  replaceItems?: ReplaceMap;
}

export const Breadcrumbs: FC<BreadcrumbsProps> = ({ removeItems, replaceItems }) => {
  const { allPathname } = usePath();

  const formattedList = allPathname;

  const map: ReplaceMap = { ...wordsToReplace, ...replaceItems };

  const formatText = (text: string): string => {
    let result = text;

    for (const [original, replacement] of Object.entries(map)) {
      const regex = new RegExp(`\\b${original}\\b`, 'giu');

      result = result.replace(regex, replacement);
    }

    return result?.replace(/-/gu, ' ')?.toLowerCase();
  };

  return (
    <div className={'mb-2'}>
      <MuiBreadcrumbs color={colors.primary}>
        {formattedList?.map((item, index) => {
          if (removeItems?.includes(item ?? '')) return null;

          if (
            index + 1 === formattedList?.length ||
            (removeItems?.includes(formattedList[index + 1] ?? '') &&
              formattedList?.length === index + 2)
          )
            return (
              <span key={item} className={'text-gray-500 font-medium capitalize'}>
                {formatText(item ?? '')}
              </span>
            );

          return (
            <Link
              key={item}
              className={'capitalize font-medium hover:underline underline-offset-4'}
              to={`/${allPathname?.slice(0, index + 1).join('/')}`}
            >
              {formatText(item ?? '')}
            </Link>
          );
        })}
      </MuiBreadcrumbs>
    </div>
  );
};
