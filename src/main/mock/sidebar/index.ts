import type * as MaterialIcons from '@mui/icons-material';
import { queryClient } from 'infra/lib';
import { paths, QueryName } from 'main/config';
import { resetFilter } from 'store/filters/slice';
import { store } from 'store/index';

interface item {
  icon: keyof typeof MaterialIcons;
  link: string;
  name: string;
  onClick?: () => void;
}

const home: item = {
  icon: 'HomeOutlined',
  link: paths.home,
  name: 'Home'
};

const detection: item = {
  icon: 'VisibilityOutlined',
  link: paths.detection,
  name: 'Detecções',
  onClick: () => {
    queryClient.resetQueries({ queryKey: [QueryName.detection] });
    store.dispatch(resetFilter('detection'));
  }
};

// const yolo: item = {
//   icon: 'DnsOutlined',
//   link: paths.yolo,
//   name: 'Yolo'
// };

export const sidebarItems = [home, detection];
