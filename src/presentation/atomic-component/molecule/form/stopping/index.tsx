import { Button } from '@mui/material';
import { useInfiniteScroll } from 'data/hooks/use-infinite-scroll';
import { useRegisterStopping } from 'data/use-case';
import type { Stopping, StoppingReason } from 'domain/models';
import { apiPaths, QueryName } from 'main/config';
import { DateTimePickerController, SelectController } from 'presentation/atomic-component/atom';
import { FormButton } from 'presentation/atomic-component/atom/form-button';
import { useEffect, type FC } from 'react';
import { useParams } from 'react-router-dom';
import { useAppSelector } from 'store/index';

interface RegisterStoppingFormProps {
  closeModal: () => void;
  stopping?: Stopping;
  companyId?: string;
}

export const RegisterStoppingForm: FC<RegisterStoppingFormProps> = ({
  closeModal,
  stopping,
  companyId
}) => {
  const { user } = useAppSelector((state) => state.persist);
  const { id = '' } = useParams<{ id: string }>();
  const {
    handleSubmit,
    onSubmit,
    setValue,
    control,
    formState: { isSubmitting }
  } = useRegisterStopping({
    stopping,
    closeModal
  });

  const stoppingReasonQuery = useInfiniteScroll<StoppingReason>({
    route: apiPaths.stoppingReason,
    limit: 30,
    filters: {
      companyId: companyId || user.companyId
    },
    queryName: QueryName.stoppingReason
  });

  useEffect(() => {
    setValue('startDate', stopping?.startDate ?? '');
    setValue('endDate', stopping?.endDate ?? '');
    setValue('stoppingReasonId', stopping?.stoppingReason?.id ?? '');
    setValue('productionReportingId', id);
  }, [
    setValue,
    stopping?.stoppingReason?.id,
    stopping?.startDate,
    stopping?.endDate,
    stopping?.productionReportingId,
    id
  ]);

  return (
    <form className={'flex flex-col gap-5 w-full'} onSubmit={handleSubmit(onSubmit)}>
      <div className={'flex flex-col gap-3 w-full'}>
        <DateTimePickerController
          control={control}
          label={'Data de início'}
          name={'startDate'}
          required
        />
        <DateTimePickerController
          control={control}
          label={'Data de término'}
          name={'endDate'}
          required
        />

        <SelectController
          control={control}
          label={'Motivo de parada'}
          name={'stoppingReasonId'}
          query={stoppingReasonQuery}
          options={
            stoppingReasonQuery.data?.map((item) => ({
              label: item.name,
              value: item.id
            })) ?? []
          }
          placeholder={'Selecione o motivo de parada'}
          required
        />
      </div>

      <div
        className={'flex flex-col tablet:flex-row gap-5 tablet:max-w-[394px] w-full mt-4 ml-auto'}
      >
        <Button className={'w-full h-12 tablet:h-auto'} color={'secondary'} onClick={closeModal}>
          Cancelar
        </Button>

        <FormButton
          disabled={isSubmitting}
          isSubmitting={isSubmitting}
          label={'Salvar'}
          sx={{ minWidth: '180px' }}
        />
      </div>
    </form>
  );
};
