import { useWindowDimensions } from 'data/hooks';
import { dimensions } from 'main/config';
import type { FC } from 'react';
import { LaptopSidebar } from './laptop';
import { MobileSidebar } from './mobile';

export const Sidebar: FC = () => {
  const { width } = useWindowDimensions();

  if (width >= dimensions.laptop) return <LaptopSidebar />;

  return <MobileSidebar />;
};
