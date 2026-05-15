import { Visibility, VisibilityOff } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { useUser } from 'data/use-case';
import type { User } from 'domain/models';
import { paths } from 'main/config';
import { validate } from 'main/utils';
import { FormButton, InputController } from 'presentation/atomic-component/atom';
import { colors } from 'presentation/style';
import { type FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

interface UserFormProps {
  user?: User;
}

export const UserForm: FC<UserFormProps> = ({ user }) => {
  const [showPassword, setShowPassword] = useState(false);

  const {
    handleSubmit,
    onSubmit,
    setValue,
    control,
    formState: { isSubmitting }
  } = useUser({ user });

  useEffect(() => {
    if (user) {
      setValue('username', user.username, validate);
    }
  }, [setValue, user]);

  return (
    <form
      className={'flex flex-col text-gray-700 dark:text-white gap-6'}
      onSubmit={handleSubmit(onSubmit)}
      autoComplete={'off'}
    >
      <h2 className={'font-semibold text-3xl text-center'}>Cadastro</h2>

      <div className={'flex flex-col gap-5'}>
        <InputController
          autoFocus
          control={control}
          labelTop={'Nome de usuário'}
          inputProps={{ autoComplete: 'new-password' }}
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
          inputProps={{ autoComplete: 'new-password' }}
          type={showPassword ? 'text' : 'password'}
        />

        <FormButton isSubmitting={isSubmitting} label={'Cradastrar'} loadingColor={colors.white} />

        <Link to={paths.login} className={'mx-auto w-max'}>
          <h3 className={'hover:underline underline-offset-4 font-bold'}>Voltar para login</h3>
        </Link>
      </div>
    </form>
  );
};
