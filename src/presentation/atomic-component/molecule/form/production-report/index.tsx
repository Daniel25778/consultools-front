import { Button } from '@mui/material';
import { useInfiniteScroll } from 'data/hooks';
import { useRegisterProductionReport } from 'data/use-case';
import { Role } from 'domain/enums';
import {
  type Collaborator,
  type Product,
  type ProductionReportDetails,
  type Shift,
  type Workstation
} from 'domain/models';
import { QueryName, apiPaths } from 'main/config';
import { listToSelect } from 'main/utils';
import {
  DateTimePickerController,
  InputController,
  SelectController
} from 'presentation/atomic-component/atom';
import { FormButton } from 'presentation/atomic-component/atom/form-button';
import { useEffect, type FC } from 'react';
import { useAppSelector } from 'store/index';

interface RegisterProductionReportFormProps {
  closeModal: () => void;
  productionReport?: ProductionReportDetails;
  companyId?: string;
}

export const RegisterProductionReportForm: FC<RegisterProductionReportFormProps> = ({
  closeModal,
  productionReport,
  companyId
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

  const { user } = useAppSelector((state) => state.persist);

  const needsCollaborator = user.role === Role.MANAGER || user.role === Role.CONSULTANT;

  const shiftQuery = useInfiniteScroll<Shift>({
    route: apiPaths.shift,
    filters: { companyId },
    limit: 30,
    queryName: QueryName.shift
  });

  const collaboratorQuery = useInfiniteScroll<Collaborator>({
    route: apiPaths.collaborator,
    filters: { companyId },
    enabled: needsCollaborator,
    limit: 30,
    queryName: QueryName.collaborator
  });

  const workstationQuery = useInfiniteScroll<Workstation>({
    route: apiPaths.workstation,
    limit: 30,
    filters: { companyId },
    queryName: QueryName.workstation
  });

  const productQuery = useInfiniteScroll<Product>({
    route: apiPaths.product,
    limit: 30,
    filters: { companyId },
    queryName: QueryName.product
  });

  useEffect(() => {
    setValue('companyId', companyId || user.companyId);
    setValue('endDate', productionReport?.endDate ?? '');
    setValue('production', productionReport?.production ?? 0);
    setValue('startDate', productionReport?.startDate ?? '');
    setValue('shiftId', productionReport?.shift?.id ?? '');
    setValue('collaboratorId', productionReport?.collaborator?.id ?? '');
    setValue('workstationId', productionReport?.workstation?.id ?? '');
    setValue('productId', productionReport?.product?.id ?? '');
  }, [
    setValue,
    user.companyId,
    user.role,
    productionReport?.collaborator?.id,
    productionReport?.shift?.id,
    productionReport?.workstation?.id,
    productionReport?.product?.id,
    productionReport?.id,
    productionReport?.startDate,
    productionReport?.endDate,
    companyId,
    productionReport?.production
  ]);

  return (
    <form className={'flex flex-col gap-5 w-full'} onSubmit={handleSubmit(onSubmit)}>
      <div className={'flex flex-col gap-3 w-full'}>
        <InputController
          control={control}
          label={'Quantidade produzida'}
          name={'production'}
          type={'number'}
          placeholder={'Digite a quantidade produzida'}
          inputProps={{ max: 2147483647, min: 1 }}
          required
        />
        <DateTimePickerController control={control} label={'Data de início'} name={'startDate'} />
        <DateTimePickerController control={control} label={'Data de término'} name={'endDate'} />

        <SelectController
          control={control}
          label={'Turno'}
          name={'shiftId'}
          query={shiftQuery}
          options={listToSelect(shiftQuery.data ?? [], undefined, productionReport?.shift)}
          placeholder={'Selecione o turno'}
          required
        />

        {(user.role === Role.MANAGER || user.role === Role.CONSULTANT) && (
          <SelectController
            control={control}
            label={'Colaborador'}
            name={'collaboratorId'}
            query={collaboratorQuery}
            options={listToSelect(
              collaboratorQuery.data ?? [],
              undefined,
              productionReport?.collaborator
            )}
            placeholder={'Selecione o colaborador'}
            required
          />
        )}
        <SelectController
          control={control}
          label={'Posto de trabalho'}
          name={'workstationId'}
          query={workstationQuery}
          options={listToSelect(
            workstationQuery.data ?? [],
            undefined,
            productionReport?.workstation
          )}
          placeholder={'Selecione o posto de trabalho'}
          required
        />
        <SelectController
          control={control}
          label={'Produto'}
          name={'productId'}
          query={productQuery}
          options={listToSelect(productQuery.data ?? [], undefined, productionReport?.product)}
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
