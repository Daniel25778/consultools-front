import { useFindYoloQuery } from 'infra/cache';
import { Title } from 'presentation/atomic-component/atom';
import type { FC } from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from 'store/index';
import { setYoloIdsSelected } from 'store/persist/slice';
import { HomeYoloItem } from './item';

interface HomeYoloListProps {
  hasError: boolean;
}

export const HomeYoloList: FC<HomeYoloListProps> = ({ hasError }) => {
  const yoloQuery = useFindYoloQuery({});
  const { yoloIdsSelected } = useAppSelector((state) => state.persist);
  const dispatch = useDispatch();

  return (
    <div
      className={
        'laptop:sticky laptop:top-[102px] h-min laptop:h-[calc(100dvh-130px)] laptop:overflow-auto flex flex-col gap-3 laptop:w-[18%] laptop:order-1 laptop:pr-6 border-r border-gray-200 dark:border-gray-500'
      }
    >
      <div className={'flex flex-col'}>
        <Title label={'Modelos de Yolo'} />
        <p
          className={`flex w-max text-[15px] ${yoloIdsSelected?.length > 0 ? 'cursor-pointer hover:font-medium' : ''}`}
          onClick={() => {
            if (yoloIdsSelected?.length > 0) dispatch(setYoloIdsSelected([]));
          }}
        >
          {yoloIdsSelected?.length > 0 ? 'Limpar lista' : 'Selecione os modelos'}
        </p>
      </div>

      <div className={'flex flex-col gap-2'}>
        {yoloQuery.data?.content?.map((item) => {
          const index = yoloIdsSelected.findIndex((selected) => selected === item.id);

          return (
            <HomeYoloItem
              hasError={hasError}
              index={index}
              item={item}
              yoloIdsSelected={yoloIdsSelected}
              key={item.id}
            />
          );
        })}
      </div>
    </div>
  );
};
