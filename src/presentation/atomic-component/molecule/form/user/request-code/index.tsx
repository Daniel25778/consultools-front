import { Button } from '@mui/material';
import { useRequestCode } from 'data/use-case';
import { FormButton, InputController } from 'presentation/atomic-component/atom';
import { colors } from 'presentation/style/palette';
import type { FC } from 'react';

export const RequestCodeForm: FC = () => {
  const {
    handleSubmit,
    control,
    onSubmit,
    formState: { isSubmitting }
  } = useRequestCode();

  return (
    <form
      className={
        'flex flex-col text-gray-700 dark:text-white gap-6 tablet:gap-10 px-0 tablet:px-[38px]'
      }
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className={'flex flex-col gap-4'}>
        <h2 className={'font-semibold text-2xl tablet:text-3xl text-primary'}>Solicitar código</h2>
        <p>Para ter acesso ao sistema, preencha o campo com o e-mail cadastrado na plataforma</p>
      </div>

      <div className={'flex flex-col gap-4'}>
        <InputController
          autoFocus
          control={control}
          labelTop={'Email'}
          name={'email'}
          placeholder={'Digite o email'}
          required
        />
      </div>

      <div className={'flex flex-col gap-4'}>
        <FormButton
          isSubmitting={isSubmitting}
          label={'Enviar instruções'}
          loadingColor={colors.white}
        />
        <Button color={'secondary'} onClick={(): void => window.history.back()}>
          Voltar
        </Button>
      </div>
    </form>
  );
};
