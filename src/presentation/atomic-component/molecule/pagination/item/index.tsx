import { colors } from 'presentation/style';
import type { CSSProperties, FC, ReactNode } from 'react';

interface PaginationItemProps {
  children?: ReactNode | string;
  handleClick?: any;
  selected: boolean;
  disabled: boolean;
  isEllipsis: boolean;
}

export const PaginationItem: FC<PaginationItemProps> = ({
  children,
  selected,
  handleClick,
  disabled,
  isEllipsis,
}) => {
  const getStyle = (): CSSProperties => {
    if (selected)
      return {
        backgroundColor: colors.primary,
        color: colors.white,
        cursor: 'pointer',
      };

    if (disabled)
      return {
        color: colors.gray[200],
      };

    if (isEllipsis)
      return {
        border: 0,
      };

    return { cursor: 'pointer' };
  };

  return (
    <span
      className={`flex items-center justify-center rounded min-h-9 min-w-9 border p-1 ${disabled ? 'border-input-border-2' : 'border-input-border-1'}`}
      onClick={handleClick}
      style={{
        ...getStyle(),
        userSelect: 'none',
      }}
    >
      {children}
    </span>
  );
};
