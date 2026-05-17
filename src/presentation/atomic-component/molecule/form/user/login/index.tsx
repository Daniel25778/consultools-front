import { Visibility, VisibilityOff } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { useUserLogin } from 'data/use-case';
import { routePaths } from 'main/config';
import { FormButton, InputController } from 'presentation/atomic-component/atom';
import { colors } from 'presentation/style/palette';
import { type FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const UserLoginForm: FC = () => {
  const [showPassword, setShowPassword] = useState(false);

  const {
    handleSubmit,
    onSubmit,
    control,
    formState: { isSubmitting }
  } = useUserLogin();

  const navigate = useNavigate();

  return (
    <form
      className={
        'flex flex-col text-gray-700  dark:text-white gap-6 tablet:gap-10 px-0 tablet:px-[38px]'
      }
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className={'flex flex-col gap-4'}>
        <h2 className={'font-semibold text-2xl tablet:text-3xl text-primary'}>
          Seja bem vindo de volta!
        </h2>
        <p>Entre em sua conta com e-mail e senha </p>
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
        <div className={'flex flex-col gap-2'}>
          <InputController
            EndIcon={
              <IconButton onClick={(): void => setShowPassword((old) => !old)} tabIndex={-1}>
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            }
            control={control}
            labelTop={'Senha'}
            name={'password'}
            placeholder={'Digite sua senha'}
            required
            type={showPassword ? 'text' : 'password'}
          />
          <div className={'flex flex-row  w-full gap-10  tablet:justify-between'}>
            <a
              onClick={() => navigate(routePaths.requestCode)}
              className={'text-primary line-clamp-1 underline cursor-pointer'}
            >
              Primeiro acesso
            </a>
            <a
              onClick={() => navigate(routePaths.requestCode)}
              className={'text-primary line-clamp-1 underline cursor-pointer'}
            >
              Esqueceu sua senha?
            </a>
          </div>
        </div>
      </div>
      <div className={'flex flex-col gap-4'}>
        <FormButton
          isSubmitting={isSubmitting}
          label={'Entrar no sistema'}
          loadingColor={colors.white}
        />
        <FormButton
          isSubmitting={false}
          color={'secondary'}
          label={'Fazer nova assinatura'}
          loadingColor={colors.white}
          labelColor={'primary'}
        />
      </div>
    </form>
  );
};
