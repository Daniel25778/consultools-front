import { KeyboardArrowDown } from '@mui/icons-material';
import { Collapse, IconButton } from '@mui/material';
import type { DetectionCreation } from 'domain/models';
import { useState, type FC } from 'react';
import { HomeDetectionImage } from '../image-item';

interface HomeDetectionYoloItemProps {
  item: DetectionCreation;
}

export const HomeDetectionYoloItem: FC<HomeDetectionYoloItemProps> = ({ item }) => {
  const [collapse, setCollapse] = useState(true);

  return (
    <div className={'flex flex-col gap-4'}>
      <div
        className={`sticky top-[70px] px-3 bg-gray-75 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 
          cursor-pointer z-10 flex items-center justify-between border-gray-300 dark:border-gray-600 border-b`}
        onClick={() => setCollapse((old) => !old)}
      >
        <h2 className={'text-2xl font-semibold pt-4 pb-3'}>{item.yolo_name}</h2>

        <IconButton color={'inherit'}>
          <KeyboardArrowDown
            className={`${collapse ? 'rotate-180' : ''}`}
            style={{ transition: 'all 500ms' }}
          />
        </IconButton>
      </div>

      <Collapse in={collapse}>
        <div className={'flex flex-col gap-8'}>
          {item.results?.map((result, index) => (
            <HomeDetectionImage
              index={index + 1}
              item={result}
              key={result.id}
              collapse={collapse}
            />
          ))}
        </div>
      </Collapse>
    </div>
  );
};
