import { Button } from '@mui/material';
import { useRegisterConsultant } from 'data/use-case';
import { FormButton } from 'presentation/atomic-component/atom/form-button';
import { InputController } from 'presentation/atomic-component/atom/input-controller';
import { type FC } from 'react';

interface RegisterConsultantFormProps {
  closeModal: () => void;
}

export const RegisterConsultantForm: FC<RegisterConsultantFormProps> = ({ closeModal }) => {
  const {
    handleSubmit,
    onSubmit,
    control,
    formState: { isSubmitting }
  } = useRegisterConsultant({
    closeModal
  });

  return (
    <form className={'flex flex-col gap-5 w-full'} onSubmit={handleSubmit(onSubmit)}>
      <div className={'flex flex-col gap-4 w-full'}>
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
          label={'Email'}
          name={'email'}
          placeholder={'Digite o email'}
          required
          type={'email'}
        />
        <InputController
          control={control}
          label={'CPF'}
          name={'cpf'}
          placeholder={'Digite o CPF (XXX.XXX.XXX-XX)'}
          required
          type={'text'}
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
