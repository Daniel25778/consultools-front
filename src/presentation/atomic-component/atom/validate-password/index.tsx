import { Check, Close } from '@mui/icons-material';
import type { FC } from 'react';

interface ValidatePasswordProps {
  password: string;
}

const getStyle = (valid: boolean): '' | 'text-red' => {
  if (valid) return '';

  return 'text-red';
};

export const ValidatePassword: FC<ValidatePasswordProps> = ({ password }) => (
  <div className={'flex flex-col w-full text-[#008000]'}>
    <p className={getStyle(!/[^\w!@#$%^&*]/u.test(password))}>
      {/[^\w!@#$%^&*]/u.test(password) ? <Close /> : <Check />} Caracteres
      válidos
    </p>

    <p className={getStyle(/^.{8,24}$/u.test(password))}>
      {/^.{8,24}$/u.test(password) ? <Check /> : <Close />} 8 e 24 caracteres
    </p>

    <p className={getStyle(/[A-Z]/u.test(password))}>
      {/[A-Z]/u.test(password) ? <Check /> : <Close />} 1 letra maiúscula
    </p>

    <p className={getStyle(/[a-z]/u.test(password))}>
      {/[a-z]/u.test(password) ? <Check /> : <Close />} 1 letra minúscula
    </p>

    <p className={getStyle(/[!@#$%^&*]/u.test(password))}>
      {/[!@#$%^&*]/u.test(password) ? <Check /> : <Close />} 1 carácter especial
    </p>

    <p className={getStyle(/[0-9]/u.test(password))}>
      {/[0-9]/u.test(password) ? <Check /> : <Close />} 1 número
    </p>
  </div>
);
