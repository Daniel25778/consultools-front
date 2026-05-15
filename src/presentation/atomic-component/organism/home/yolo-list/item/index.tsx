import { InfoOutline } from '@mui/icons-material';
import { Tooltip } from '@mui/material';
import { useModal, useTheme } from 'data/hooks';
import type { Yolo } from 'domain/models';
import { YoloModal } from 'presentation/atomic-component/molecule/modal';
import { colors } from 'presentation/style';
import type { FC, ReactNode } from 'react';
import { useDispatch } from 'react-redux';
import { setYoloIdsSelected } from 'store/persist/slice';

interface HomeYoloItemProps {
  item: Yolo;
  index: number;
  yoloIdsSelected: string[];
  hasError: boolean;
}

export const HomeYoloItem: FC<HomeYoloItemProps> = ({ index, item, yoloIdsSelected, hasError }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const modal = useModal();

  const cardItem = (name: string, quantity: number | string, icon?: ReactNode): ReactNode => {
    return (
      <div className={'flex flex-col gap-1'}>
        <p className={'flex gap-1 font-semibold text-sm'}>
          {icon}
          {name}
        </p>
        <p className={'font-medium text-sm'}>{quantity}</p>
      </div>
    );
  };

  return (
    <div
      onClick={() => {
        const newList =
          index === -1
            ? [...yoloIdsSelected, item.id]
            : yoloIdsSelected.filter((id) => id !== item.id);

        dispatch(setYoloIdsSelected(newList));
      }}
      key={item.id}
      className={`flex gap-4 cursor-pointer font-medium border rounded-md
                ${index === -1 ? 'bg-gray-100 dark:bg-gray-700' : 'bg-primary/20 text-primary dark:text-white dark:bg-primary/35 border-white'} ${hasError && 'border border-red'}`}
    >
      <div className={'flex items-center justify-center min-w-[40px] w-1/5'}>
        {index === -1 ? (
          <span
            className={
              'w-3.5 h-3.5 bg-primary/10 dark:bg-primary/60 border border-primary/30 dark:border-primary/90 rounded-full p-0'
            }
          />
        ) : (
          <p>{index + 1}</p>
        )}
      </div>

      <h2 className={'flex items-center w-full'}>{item.name}</h2>

      <YoloModal type={'HOME'} yolo={item} modal={modal} />

      <Tooltip
        slotProps={{
          tooltip: {
            style: { backgroundColor: 'transparent', padding: '0' }
          },
          arrow: { style: { color: theme === 'light' ? colors.gray[250] : 'white' } }
        }}
        arrow
        title={
          <div
            onClick={(event) => event.stopPropagation()}
            className={
              'flex flex-col gap-4 bg-white dark:bg-gray-800 dark:text-white border-2 border-gray-250 rounded p-3 px-6 text-gray-900 text-base font-semibold'
            }
          >
            <h2>{item.name}</h2>
            <div className={'grid grid-cols-2 gap-3 gap-x-6'}>
              {cardItem('Épocas', item?.args?.epochs)}
              {cardItem('Treinamento', `${item?.total_train_images} imagens`)}
              {cardItem('Validação', `${item?.total_val_images} imagens`)}
              {cardItem('Teste', `${item?.total_test_images} imagens`)}

              {/* <div className={'cursor-pointer'} onClick={modal.openModal}>
                Ver mais
              </div> */}
            </div>
          </div>
        }
        placement={'right'}
      >
        <div
          className={'p-2 rounded-r-md'}
          onClick={(event) => {
            event.stopPropagation();
          }}
        >
          <InfoOutline fontSize={'small'} />
        </div>
      </Tooltip>
    </div>
  );
};
