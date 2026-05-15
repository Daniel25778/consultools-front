import * as MaterialIcons from '@mui/icons-material';
import type { IconTypes } from 'domain/protocol';
import { colors } from 'presentation/style';
import type { FC, ReactNode } from 'react';

interface TitleProps {
  label: string;
  labelButton?: ReactNode;
  color?: string;
  icon?: IconTypes;
  endElement?: ReactNode;
  size?: 'normal' | 'small';
  align?: 'center' | 'left' | 'right';
}

export const Title: FC<TitleProps> = ({
  label,
  icon,
  labelButton,
  endElement,
  color,
  size = 'normal',
  align = 'left'
}) => {
  const IconComponent = MaterialIcons[icon ?? 'Add'];

  return (
    <div
      className={'flex flex-wrap justify-between gap-4 items-start'}
      style={{ borderColor: color ?? colors.primary }}
    >
      <div
        className={'flex gap-2 items-center font-semibold'}
        style={{ color: color ?? colors.primary }}
      >
        {icon ? <IconComponent color={'primary'} /> : null}
        <h1 style={{ textAlign: align }} className={size === 'small' ? 'text-xl' : 'text-2xl'}>
          {label}
        </h1>
        {labelButton || null}
      </div>

      {endElement}
    </div>
  );
};
