import { Button } from '@mui/material';
import { useRegisterWorkstation } from 'data/use-case';
import { Status } from 'domain/enums';
import type { Workstation } from 'domain/models';
import { FormButton } from 'presentation/atomic-component/atom/form-button';
import { InputController } from 'presentation/atomic-component/atom/input-controller';
import { SwitchController } from 'presentation/atomic-component/atom/switch-controller';
import { useEffect, type FC } from 'react';

interface RegisterWorkstationFormProps {
  closeModal: () => void;
  workstation?: Workstation;
}

export const RegisterWorkstationForm: FC<RegisterWorkstationFormProps> = ({
  closeModal,
  workstation
}) => {
  const {
    handleSubmit,
    onSubmit,
    setValue,
    control,
    formState: { isSubmitting }
  } = useRegisterWorkstation({
    workstation,
    closeModal
  });

  const location = window.location.pathname;
  const companyId = location.split('/')[2];

  useEffect(() => {
    setValue('companyId', companyId);
    if (workstation) {
      const { name, description, status } = workstation as Workstation;
      setValue('name', name);
      setValue('description', description);
      setValue('status', status);
    }
  }, [setValue, workstation, companyId]);

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
          placeholder={'Digite a descrição'}
          required
          multiline
          minRows={4}
          maxRows={4}
          type={'text'}
        />

        <div className={'flex w-full items-center justify-between'}>
          <p className={'w-full'}>Situação atual do posto de trabalho</p>
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
