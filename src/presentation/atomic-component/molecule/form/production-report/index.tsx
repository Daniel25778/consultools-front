import { Button } from '@mui/material';
import { useInfiniteScroll } from 'data/hooks';
import { useRegisterProductionReport } from 'data/use-case';
import { type Product, type ProductionReport, type Shift, type Workstation } from 'domain/models';
import { QueryName, apiPaths } from 'main/config';
import { timeOptions } from 'main/utils/time-options';
import { InputController, SelectController } from 'presentation/atomic-component/atom';
import { FormButton } from 'presentation/atomic-component/atom/form-button';
import { useEffect, type FC } from 'react';
import { useAppSelector } from 'store/index';

interface RegisterProductionReportFormProps {
  closeModal: () => void;
  productionReport?: ProductionReport;
}

export const RegisterProductionReportForm: FC<RegisterProductionReportFormProps> = ({
  closeModal,
  productionReport
}) => {
  const {
    handleSubmit,
    onSubmit,
    setValue,
    control,
    formState: { isSubmitting }
  } = useRegisterProductionReport({
    productionReport,
    closeModal
  });

  const shiftQuery = useInfiniteScroll<Shift>({
    route: apiPaths.shift,
    limit: 20,
    queryName: QueryName.shift
  });

  const workstationQuery = useInfiniteScroll<Workstation>({
    route: apiPaths.workstation,
    limit: 20,
    queryName: QueryName.workstation
  });

  const productQuery = useInfiniteScroll<Product>({
    route: apiPaths.product,
    limit: 20,
    queryName: QueryName.product
  });

  const { user } = useAppSelector((state) => state.persist);

  useEffect(() => {
    setValue('companyId', user.companyId);
  }, [setValue, user.companyId]);

  return (
    <form className={'flex flex-col gap-5 w-full'} onSubmit={handleSubmit(onSubmit)}>
      <div className={'flex flex-col gap-3 w-full'}>
        <InputController
          control={control}
          label={'Quantidade produzida'}
          name={'production'}
          type={'number'}
          placeholder={'Digite a quantidade produzida'}
          inputProps={{ max: 2147483647, min: 0 }}
          required
        />
        <SelectController
          control={control}
          label={'Horário de início'}
          name={'startTime'}
          options={timeOptions}
          placeholder={'00:00'}
          required
        />
        <SelectController
          control={control}
          label={'Horário de término'}
          name={'endTime'}
          options={timeOptions}
          placeholder={'00:00'}
          required
        />

        <SelectController
          control={control}
          label={'Turno'}
          name={'shiftId'}
          query={shiftQuery}
          options={
            shiftQuery.data?.map((item) => ({
              label: item.name,
              value: item.id
            })) ?? []
          }
          placeholder={'Selecione o turno'}
          required
        />
        <SelectController
          control={control}
          label={'Posto de trabalho'}
          name={'workstationId'}
          query={workstationQuery}
          options={
            workstationQuery.data?.map((item) => ({
              label: item.name,
              value: item.id
            })) ?? []
          }
          placeholder={'Selecione o posto de trabalho'}
          required
        />
        <SelectController
          control={control}
          label={'Produto'}
          name={'productId'}
          query={productQuery}
          options={
            productQuery.data?.map((item) => ({
              label: item.name,
              value: item.id
            })) ?? []
          }
          placeholder={'Selecione o produto'}
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
