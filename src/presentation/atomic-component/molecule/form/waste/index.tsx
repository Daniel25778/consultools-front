import { Button } from '@mui/material';
import { useInfiniteScroll } from 'data/hooks/use-infinite-scroll';
import { useRegisterWaste } from 'data/use-case';
import type { Waste, WasteType } from 'domain/models';
import { apiPaths, QueryName } from 'main/config';
import { InputController, SelectController } from 'presentation/atomic-component/atom';
import { FormButton } from 'presentation/atomic-component/atom/form-button';
import { useEffect, type FC } from 'react';
import { useParams } from 'react-router-dom';
import { useAppSelector } from 'store/index';

interface RegisterWasteFormProps {
  closeModal: () => void;
  waste?: Waste;
  companyId?: string;
}

export const RegisterWasteForm: FC<RegisterWasteFormProps> = ({ closeModal, waste, companyId }) => {
  const { user } = useAppSelector((state) => state.persist);
  const { id = '' } = useParams<{ id: string }>();
  const {
    handleSubmit,
    onSubmit,
    setValue,
    control,
    formState: { isSubmitting }
  } = useRegisterWaste({
    waste,
    closeModal
  });

  const wasteTypeQuery = useInfiniteScroll<WasteType>({
    route: apiPaths.wasteType,
    limit: 30,
    filters: {
      companyId: companyId || user.companyId
    },
    queryName: QueryName.wasteType
  });

  useEffect(() => {
    setValue('quantity', waste?.quantity ?? 0);
    setValue('wasteTypeId', waste?.wasteType?.id ?? '');
    setValue('productionReportingId', id);
  }, [
    setValue,
    waste?.wasteType?.id,
    waste?.quantity,
    waste?.startTime,
    waste?.endTime,
    waste?.productionReportingId,
    id
  ]);

  return (
    <form className={'flex flex-col gap-5 w-full'} onSubmit={handleSubmit(onSubmit)}>
      <div className={'flex flex-col gap-3 w-full'}>
        <InputController
          control={control}
          label={'Quantidade refugada'}
          name={'quantity'}
          type={'number'}
          placeholder={'Digite a quantidade refugada'}
          inputProps={{ max: 2147483647, min: 1 }}
          required
        />
        <SelectController
          control={control}
          label={'Tipo de refugo'}
          name={'wasteTypeId'}
          query={wasteTypeQuery}
          options={
            wasteTypeQuery.data?.map((item) => ({
              label: item.name,
              value: item.id
            })) ?? []
          }
          placeholder={'Selecione o tipo de refugo'}
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
