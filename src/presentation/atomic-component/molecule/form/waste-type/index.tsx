import { Button } from '@mui/material';
import { useRegisterWasteType } from 'data/use-case';
import type { WasteType } from 'domain/models/waste-type';
import { FormButton } from 'presentation/atomic-component/atom/form-button';
import { InputController } from 'presentation/atomic-component/atom/input-controller';
import { useEffect, type FC } from 'react';

interface RegisterWasteTypeFormProps {
  closeModal: () => void;
  wasteType?: WasteType;
}

export const RegisterWasteTypeForm: FC<RegisterWasteTypeFormProps> = ({
  closeModal,
  wasteType
}) => {
  const {
    handleSubmit,
    onSubmit,
    setValue,
    control,
    formState: { isSubmitting }
  } = useRegisterWasteType({
    wasteType,
    closeModal
  });

  const location = window.location.pathname;
  const companyId = location.split('/')[2];

  useEffect(() => {
    setValue('companyId', companyId);
    if (wasteType) {
      setValue('code', wasteType.code);
      setValue('name', wasteType.name);
      setValue('description', wasteType.description);
    }
  }, [setValue, wasteType, companyId]);

  return (
    <form className={'flex flex-col gap-5 w-full'} onSubmit={handleSubmit(onSubmit)}>
      <div className={'flex flex-col gap-3 w-full'}>
        <InputController
          autoFocus
          control={control}
          label={'Código'}
          name={'code'}
          placeholder={'Digite o código'}
          required
        />
        <InputController
          control={control}
          label={'Nome'}
          name={'name'}
          placeholder={'Digite o nome'}
          required
        />
        <InputController
          control={control}
          label={'Descrição'}
          name={'description'}
          maxRows={5}
          minRows={4}
          placeholder={'Digite a descrição'}
          required
          multiline
        />
      </div>

      <div
        className={'flex flex-col tablet:flex-row gap-5 tablet:max-w-[394px] w-full mt-4 ml-auto'}
      >
        <Button className={'w-full h-12 tablet:h-auto'} color={'secondary'} onClick={closeModal}>
          Cancelar
        </Button>
        <FormButton disabled={isSubmitting} isSubmitting={isSubmitting} label={'Salvar'} />
      </div>
    </form>
  );
};
