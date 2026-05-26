import { Button } from '@mui/material';
import { useRegisterShift } from 'data/use-case';
import type { Shift } from 'domain/models';
import { timeOptions } from 'main/utils/time-options';
import { SelectController } from 'presentation/atomic-component/atom';
import { FormButton } from 'presentation/atomic-component/atom/form-button';
import { InputController } from 'presentation/atomic-component/atom/input-controller';
import { useEffect, type FC } from 'react';

interface RegisterShiftFormProps {
  closeModal: () => void;
  shift?: Shift;
}

export const RegisterShiftForm: FC<RegisterShiftFormProps> = ({ closeModal, shift }) => {
  const {
    handleSubmit,
    onSubmit,
    setValue,
    control,
    formState: { isSubmitting }
  } = useRegisterShift({
    shift,
    closeModal
  });

  const location = window.location.pathname;
  const companyId = location.split('/')[2];

  useEffect(() => {
    setValue('companyId', companyId);
    if (shift) {
      setValue('name', shift.name);
      setValue('startTime', shift.startTime?.substring(0, 5));
      setValue('endTime', shift.endTime?.substring(0, 5));
    }
  }, [setValue, shift, companyId]);

  return (
    <form className={'flex flex-col gap-5 w-full'} onSubmit={handleSubmit(onSubmit)}>
      <div className={'flex flex-col gap-3 w-full'}>
        <InputController
          control={control}
          label={'Nome'}
          name={'name'}
          placeholder={'Digite o nome'}
          required
        />

        <div className={'grid grid-cols-1 tablet:grid-cols-2 gap-3 w-full'}>
          <SelectController
            control={control}
            label={'Horário de início'}
            name={'startTime'}
            options={timeOptions}
            placeholder={'00:00'}
            required
          />

          <SelectController
            control={control}
            label={'Horário de término'}
            name={'endTime'}
            options={timeOptions}
            placeholder={'00:00'}
            required
          />
        </div>
      </div>

      <div
        className={'flex flex-col tablet:flex-row gap-5 tablet:max-w-[394px] w-full mt-4 ml-auto'}
      >
        <Button className={'w-full h-12 tablet:h-auto'} color={'secondary'} onClick={closeModal}>
          Cancelar
        </Button>
        <FormButton disabled={isSubmitting} isSubmitting={isSubmitting} label={'Salvar'} />
      </div>
    </form>
  );
};
