import * as MaterialIcons from '@mui/icons-material';
import type { SxProps } from '@mui/material';
import type { FC } from 'react';

interface IconRenderProps {
  name: string;
  sx?: SxProps;
}

export const IconRender: FC<IconRenderProps> = ({ name, sx }) => {
  const name2 = `${name.slice(0, 1).toUpperCase()}${name.slice(1)}`.replace(/ /gu, '');
  const formattedName = name2.endsWith('Icon') ? name2.replace('Icon', '') : name2;

  const IconComponent = MaterialIcons[formattedName as keyof typeof MaterialIcons];

  if (!IconComponent) return <div className={'text-red font-semibold'}>Ícone inválido</div>;

  return (
    <IconComponent
      color={'inherit'}
      sx={{
        ':hover': {
          rotate: '1.5deg',
          scale: 1.03,
          transition: 'all 0.15s ease-in-out'
        },
        ...sx
      }}
    />
  );
};
