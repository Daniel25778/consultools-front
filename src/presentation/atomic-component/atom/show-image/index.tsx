import { ImageOutlined } from '@mui/icons-material';
import { colors } from 'presentation/style';
import type { FC } from 'react';

interface ShowImageProps {
  logoUrl?: string | null;
  className?: string;
}

export const ShowImage: FC<ShowImageProps> = ({ logoUrl, className }) => {
  if (logoUrl)
    return (
      <img
        alt={'Logo'}
        className={`w-full h-[175px] tablet:h-[225px] bg-gray-75 object-contain rounded-md border ${className}`}
        src={logoUrl}
      />
    );

  return (
    <div
      className={`flex items-center justify-center w-full h-[175px] tablet:h-[225px] bg-gray-75 object-contain rounded-md border ${className}`}
    >
      <ImageOutlined sx={{ color: colors.gray[350], fontSize: '64px' }} />
    </div>
  );
};
