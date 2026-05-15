import { FormControlLabel, FormGroup, Radio } from '@mui/material';
import { useInfiniteScroll, useTheme } from 'data/hooks';
import type { Detection } from 'domain/models';
import { useFindYoloQuery } from 'infra/cache';
import { apiPaths, QueryName } from 'main/config';
import { listToSelect, setFilter } from 'main/utils';
import { FetchOnScroll, Title } from 'presentation/atomic-component/atom';
import { Select, type SelectValues } from 'presentation/atomic-component/atom/select';
import { DetectionItem } from 'presentation/atomic-component/organism';
import { colors } from 'presentation/style';
import type { FC } from 'react';
import { useAppSelector } from 'store/index';

export const DetectionContent: FC = () => {
  const {
    detection: { success, yolo_ids }
  } = useAppSelector((state) => state.filter);

  const theme = useTheme();

  const yoloQuery = useFindYoloQuery({});

  const { data, ...query } = useInfiniteScroll<Detection>({
    limit: 8,
    filters: { success, yolo_ids: yolo_ids?.map((item) => item.value).join(',') },
    queryName: QueryName.detection,
    route: apiPaths.detection
  });

  return (
    <div className={'flex flex-col gap-4'}>
      <Title label={'Minhas detecções'} />
      <FetchOnScroll query={query} className={'grid grid-cols-1 laptop:grid-cols-2 gap-3'}>
        {query.pagination ? (
          <div className={'flex items-end mb-4'}>
            {query?.pagination?.total_elements === 0 ? (
              <span className={'text-sm font-semibold text-gray-550 dark:text-white min-w-[50px]'}>
                Nenhum item encontrado
              </span>
            ) : (
              <p className={'text-sm font-semibold text-gray-550 dark:text-white min-w-[50px]'}>
                Total de {query.pagination?.total_elements}{' '}
                {query.pagination?.total_elements === 1 ? 'detecção' : 'detecções'}
              </p>
            )}
          </div>
        ) : (
          <div />
        )}

        <span className={'flex w-full gap-6 items-center justify-end mb-4'}>
          <FormGroup row sx={{ gap: '8px' }}>
            <FormControlLabel
              control={
                <Radio
                  checked={success === true}
                  onChange={() => setFilter('detection', { success: true })}
                  sx={{ color: theme === 'dark' ? colors.primary : '' }}
                />
              }
              label={'Sucesso'}
            />

            <FormControlLabel
              control={
                <Radio
                  checked={success === false}
                  onChange={() => setFilter('detection', { success: false })}
                  sx={{ color: theme === 'dark' ? colors.primary : '' }}
                />
              }
              label={'Falha'}
            />

            <FormControlLabel
              control={
                <Radio
                  checked={success === null}
                  onChange={() => setFilter('detection', { success: null })}
                  sx={{ color: theme === 'dark' ? colors.primary : '' }}
                />
              }
              label={'Todos'}
            />
          </FormGroup>

          <Select
            width={300}
            id={'yolo_ids'}
            isMultiple
            label={'Modelos de Yolo'}
            value={yolo_ids}
            options={listToSelect(yoloQuery?.data?.content ?? [])}
            onChange={(event) => {
              const value = (event ?? []) as SelectValues[];

              setFilter('detection', { yolo_ids: value });
            }}
          />
        </span>

        {data?.map((item) => {
          const yolo = yoloQuery.data?.content?.find((yoloItem) => item.yolo_id === yoloItem.id);

          return <DetectionItem key={item.id} item={item} yolo={yolo} />;
        })}
      </FetchOnScroll>
    </div>
  );
};
