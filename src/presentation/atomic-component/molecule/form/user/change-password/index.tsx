import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Button, IconButton } from '@mui/material';
import { useChangePassword } from 'data/use-case';
import { FormButton, InputController } from 'presentation/atomic-component/atom';
import { colors } from 'presentation/style/palette';
import { useState, type FC } from 'react';
import { useAppSelector } from 'store/index';

export const ChangePasswordForm: FC = () => {
  const { code, email } = useAppSelector((state) => state.recovery);
  const [showPassword, setShowPassword] = useState(false);
  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
    onSubmit
  } = useChangePassword({
    email: email ?? undefined,
    code: code ?? undefined
  });

  return (
    <form
      className={
        'flex flex-col text-gray-700 dark:text-white gap-6 tablet:gap-10 px-0 tablet:px-[38px]'
      }
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className={'flex flex-col gap-4'}>
        <h2 className={'font-semibold text-2xl tablet:text-3xl text-primary'}>
          Definir nova senha
        </h2>
        <p>Para ter acesso ao sistema, preencha o formulário abaixo e cadastre a nova senha</p>
      </div>

      <div className={'flex flex-col gap-4'}>
        <InputController
          EndIcon={
            <IconButton onClick={(): void => setShowPassword((old) => !old)} tabIndex={-1}>
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          }
          control={control}
          labelTop={'Senha'}
          name={'newPassword'}
          type={showPassword ? 'text' : 'password'}
          placeholder={'Digite a nova senha'}
          required
        />
      </div>

      <div className={'flex flex-col gap-4'}>
        <FormButton
          isSubmitting={isSubmitting}
          label={'Alterar senha'}
          loadingColor={colors.white}
        />
        <Button color={'secondary'} onClick={(): void => window.history.back()}>
          Voltar
        </Button>
      </div>
    </form>
  );
};
