import { Button } from '@mui/material';
import { useRegisterCompany } from 'data/use-case';
import { Status } from 'domain/enums';
import type { Company } from 'domain/models/company';
import { FormButton } from 'presentation/atomic-component/atom/form-button';
import { InputController } from 'presentation/atomic-component/atom/input-controller';
import { SwitchController } from 'presentation/atomic-component/atom/switch-controller';
import { useEffect, type FC } from 'react';

interface RegisterCompanyFormProps {
  closeModal: () => void;
  company?: Company;
}

export const RegisterCompanyForm: FC<RegisterCompanyFormProps> = ({ closeModal, company }) => {
  const {
    handleSubmit,
    onSubmit,
    setValue,
    control,
    formState: { isSubmitting }
  } = useRegisterCompany({
    company,
    closeModal
  });

  useEffect(() => {
    if (company) {
      const { name, cnpj, status } = company;
      setValue('name', name);
      setValue('cnpj', cnpj);
      setValue('status', status);
    }
  }, [setValue, company]);

  return (
    <form className={'flex flex-col gap-5 w-full'} onSubmit={handleSubmit(onSubmit)}>
      <div className={'flex flex-col gap-3 w-full'}>
        <InputController
          autoFocus
          control={control}
          label={'Nome da Empresa'}
          name={'name'}
          placeholder={'Digite o nome'}
          required
          type={'text'}
        />

        <InputController
          control={control}
          label={'CNPJ'}
          mask={'00.000.000/0000-00'}
          name={'cnpj'}
          placeholder={'Digite o CNPJ'}
          required
          type={'text'}
        />

        <div className={'flex w-full items-center justify-between'}>
          <p className={'w-full'}>Situação atual da empresa</p>
          <SwitchController
            control={control}
            name={'status'}
            options={[
              { label: 'Desabilitada', value: Status.DISABLED },
              { label: 'Habilitada', value: Status.ENABLED }
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
