import { Visibility, VisibilityOff } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { useUserLogin } from 'data/use-case';
import { paths } from 'main/config';
import { FormButton, InputController } from 'presentation/atomic-component/atom';
import { colors } from 'presentation/style';
import { type FC, useState } from 'react';
import { Link } from 'react-router-dom';

export const UserLoginForm: FC = () => {
  const [showPassword, setShowPassword] = useState(false);

  const {
    handleSubmit,
    onSubmit,
    control,
    formState: { isSubmitting }
  } = useUserLogin();

  return (
    <form
      className={'flex flex-col text-gray-700 dark:text-white gap-6'}
      onSubmit={handleSubmit(onSubmit)}
    >
      <h2 className={'font-semibold text-3xl text-center'}>Login</h2>

      <div className={'flex flex-col gap-5'}>
        <InputController
          autoFocus
          control={control}
          labelTop={'Nome de usuário'}
          name={'username'}
          placeholder={'Digite o nome de usuário'}
          required
        />

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

        <FormButton isSubmitting={isSubmitting} label={'Entrar'} loadingColor={colors.white} />

        <Link to={paths.register} className={'mx-auto w-max'}>
          <h3 className={'hover:underline underline-offset-4 font-bold'}>Registrar-se</h3>
        </Link>
      </div>
    </form>
  );
};
