import { Button } from '@mui/material';
import { useVerifyCode } from 'data/use-case';
import { FormButton } from 'presentation/atomic-component/atom';
import { CodeInput } from 'presentation/atomic-component/atom/code-input';
import { colors } from 'presentation/style/palette';
import type { FC } from 'react';

export const EnterCodeForm: FC = () => {
  const {
    handleSubmit,
    onSubmit,
    control,
    formState: { isSubmitting }
  } = useVerifyCode();

  return (
    <form
      className={
        'flex flex-col text-gray-700 dark:text-white gap-6 tablet:gap-10 px-0 tablet:px-[38px]'
      }
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className={'flex flex-col gap-4'}>
        <h2 className={'font-semibold text-2xl tablet:text-3xl text-primary'}>Inserir código</h2>
        <p>Digite o código que enviamos para seu e-mail.</p>
      </div>

      <div className={'flex flex-col gap-4'}>
        <CodeInput
          control={control}
          name={'code'}
          labelTop={'Código'}
          required
          length={6}
          autoFocus
        />
      </div>

      <div className={'flex flex-col gap-4'}>
        <FormButton isSubmitting={isSubmitting} label={'Confirmar'} loadingColor={colors.white} />
        <Button color={'secondary'} onClick={(): void => window.history.back()}>
          Voltar
        </Button>
      </div>
    </form>
  );
};
