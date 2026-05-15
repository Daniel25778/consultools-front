import { TabContext } from '@mui/lab';
import { Tabs as MaterialTabs, Tab } from '@mui/material';
import { colors } from 'presentation/style';
import type { FC, ReactNode, SyntheticEvent } from 'react';

interface TabsProps {
  tabs: { title: ReactNode | string; value: string }[];
  tabValue: string;
  onChange: (newValue: string) => void;
  children?: ReactNode;
}

export const Tabs: FC<TabsProps> = ({ tabValue, onChange, children, tabs }) => {
  const handleChange = (_event: SyntheticEvent, newValue: string): void => {
    onChange(newValue);
  };

  return (
    <TabContext value={String(tabValue)}>
      <MaterialTabs
        onChange={handleChange}
        sx={{ borderBottom: `1px solid ${colors.gray[200]}` }}
        value={tabValue}
      >
        {tabs.map((item, index) => (
          <Tab
            key={item.value}
            label={item.title}
            sx={{
              fontSize: '18px',
              fontWeight: '600',
              marginLeft: index >= 1 ? '24px' : 0,
              minWidth: '73px',
              padding: '0px 4px',
              textTransform: 'capitalize',
            }}
            value={item.value}
          />
        ))}
      </MaterialTabs>

      {children}
    </TabContext>
  );
};
