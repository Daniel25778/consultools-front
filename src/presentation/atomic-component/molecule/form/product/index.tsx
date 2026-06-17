import { Button } from '@mui/material';
import { useRegisterProduct } from 'data/use-case';
import { Status } from 'domain/enums';
import type { Product } from 'domain/models';
import { useFindMeasurementUnitQuery } from 'infra/cache';
import { listToSelect } from 'main/utils';
import { SelectController } from 'presentation/atomic-component/atom';
import { FormButton } from 'presentation/atomic-component/atom/form-button';
import { InputController } from 'presentation/atomic-component/atom/input-controller';
import { SwitchController } from 'presentation/atomic-component/atom/switch-controller';
import { useEffect, type FC } from 'react';

interface RegisterProductFormProps {
  closeModal: () => void;
  product?: Product;
}

export const RegisterProductForm: FC<RegisterProductFormProps> = ({ closeModal, product }) => {
  const {
    handleSubmit,
    onSubmit,
    setValue,
    control,
    formState: { isSubmitting }
  } = useRegisterProduct({
    product,
    closeModal
  });

  const measurementUnitQuery = useFindMeasurementUnitQuery({});
  const location = window.location.pathname;
  const companyId = location.split('/')[2];

  useEffect(() => {
    setValue('companyId', companyId);
  }, [setValue, companyId]);

  return (
    <form className={'flex flex-col gap-5 w-full'} onSubmit={handleSubmit(onSubmit)}>
      <div className={'flex flex-col gap-3 w-full'}>
        <InputController
          autoFocus
          control={control}
          label={'Nome'}
          name={'name'}
          placeholder={'Digite o nome'}
          required
          type={'text'}
        />

        <InputController
          control={control}
          label={'Descrição'}
          name={'description'}
          multiline
          minRows={4}
          maxRows={4}
          placeholder={'Digite a descrição'}
          required
          type={'text'}
        />

        <SelectController
          control={control}
          label={'Unidade de medida'}
          name={'measurementUnitId'}
          options={listToSelect(
            measurementUnitQuery.data?.content ?? [],
            undefined,
            product?.measurementUnit
          )}
          placeholder={'Selecione a unidade'}
          required
        />

        <div className={'flex w-full items-center justify-between'}>
          <p className={'w-full'}>Situação atual do produto</p>
          <SwitchController
            control={control}
            name={'status'}
            options={[
              { label: 'Desabilitado', value: Status.DISABLED },
              { label: 'Habilitado', value: Status.ENABLED }
            ]}
            showMessage
          />
        </div>
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
