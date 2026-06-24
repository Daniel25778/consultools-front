import { Button, FormControl, FormControlLabel, Radio, RadioGroup } from '@mui/material';
import { useRegisterCollaborator } from 'data/use-case';
import { Role, Status } from 'domain/enums';
import type { Collaborator } from 'domain/models';
import { FormButton } from 'presentation/atomic-component/atom/form-button';
import { InputController } from 'presentation/atomic-component/atom/input-controller';
import { SwitchController } from 'presentation/atomic-component/atom/switch-controller';
import { useEffect, type ChangeEvent, type FC } from 'react';

interface RegisterCollaboratorFormProps {
  closeModal: () => void;
  collaborator?: Collaborator;
}

export const RegisterCollaboratorForm: FC<RegisterCollaboratorFormProps> = ({
  closeModal,
  collaborator
}) => {
  const {
    handleSubmit,
    onSubmit,
    setValue,
    control,
    watch,
    formState: { isSubmitting }
  } = useRegisterCollaborator({
    collaborator,
    closeModal
  });

  const location = window.location.pathname;
  const companyId = location.split('/')[2];
  const role = watch('role');

  useEffect(() => {
    setValue('companyId', companyId);
    if (collaborator) {
      const { name, email, cpf, status, role } = collaborator as Collaborator;
      setValue('name', name);
      setValue('email', email);
      setValue('cpf', cpf);
      setValue('status', status);
      setValue('role', role);
    } else setValue('role', Role.COLLABORATOR);
  }, [setValue, collaborator, companyId]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue('role', (event.target as HTMLInputElement).value as Role);
  };

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
          label={'Email'}
          name={'email'}
          placeholder={'Digite o email'}
          required
          type={'email'}
        />
        <InputController
          control={control}
          label={'CPF'}
          mask={'000.000.000-00'}
          name={'cpf'}
          placeholder={'Digite o CPF'}
          required
          type={'text'}
        />

        <FormControl>
          <RadioGroup defaultValue={Role.COLLABORATOR} onChange={handleChange}>
            <FormControlLabel
              value={Role.COLLABORATOR}
              control={<Radio color={'primary'} checked={role === Role.COLLABORATOR} />}
              label={'Colaborador'}
            />
            <FormControlLabel
              value={Role.MANAGER}
              control={<Radio color={'primary'} checked={role === Role.MANAGER} />}
              label={'Gerente'}
            />
          </RadioGroup>
        </FormControl>

        <div className={'flex w-full items-center justify-between'}>
          <p className={'w-full'}>Situação atual do colaborador</p>
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
