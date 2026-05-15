import { colors } from 'presentation/style';
import type { FC } from 'react';

interface Props {
  readonly hasShadow?: boolean;
}

export const LoadingPage: FC<Props> = ({ hasShadow = false }) => (
  <div
    className={'h-screen fixed w-full items-center top-0 left-0 justify-center flex'}
    style={{
      background: hasShadow ? 'rgba(0, 0, 0, 0.15)' : colors.white,
      zIndex: hasShadow ? '200' : '300'
    }}
  >
    <svg className={'max-h-[250px]'} viewBox={'0 0 33 60'}>
      <polygon
        points={'16,1 32,32 1,32'}
        style={{
          animation: 'dash 2.5s cubic-bezier(0.35, 0.04, 0.63, 0.95) infinite',
          fill: 'none',
          stroke: colors.primary,
          strokeDasharray: 17,
          strokeWidth: 1
        }}
        textAnchor={'middle'}
      />

      <text
        style={{
          animation: 'blink 1s ease-in-out infinite',
          fill: colors.primary,
          fontSize: '4.6px'
        }}
        x={'3'}
        y={'42.5'}
      >
        Carregando...
      </text>
    </svg>
  </div>
);
