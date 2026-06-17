import { Button } from '@mui/material';
import { useInfiniteScroll } from 'data/hooks';
import { useRegisterStoppingReason } from 'data/use-case';
import { Nature, Status } from 'domain/enums';
import type { ResponsibleArea, StoppingReason } from 'domain/models';
import { apiPaths, QueryName } from 'main/config';
import { listToSelect } from 'main/utils';
import { SelectController } from 'presentation/atomic-component/atom';
import { FormButton } from 'presentation/atomic-component/atom/form-button';
import { InputController } from 'presentation/atomic-component/atom/input-controller';
import { SwitchController } from 'presentation/atomic-component/atom/switch-controller';
import { useEffect, type FC } from 'react';

interface RegisterStoppingReasonFormProps {
  closeModal: () => void;
  stoppingReason?: StoppingReason;
}

export const RegisterStoppingReasonForm: FC<RegisterStoppingReasonFormProps> = ({
  closeModal,
  stoppingReason
}) => {
  const {
    handleSubmit,
    onSubmit,
    setValue,
    control,
    formState: { isSubmitting }
  } = useRegisterStoppingReason({
    stoppingReason,
    closeModal
  });

  const location = window.location.pathname;
  const companyId = location.split('/')[2];

  const responsibleAreaQuery = useInfiniteScroll<ResponsibleArea>({
    route: apiPaths.responsibleArea,
    limit: 30,
    filters: {
      companyId
    },
    queryName: QueryName.responsibleArea
  });

  useEffect(() => {
    setValue('companyId', companyId);
    setValue('responsibleAreaId', stoppingReason?.responsibleArea?.id ?? '');
  }, [setValue, companyId, stoppingReason?.responsibleArea?.id]);

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
          label={'Descrição'}
          name={'description'}
          multiline
          minRows={4}
          maxRows={4}
          placeholder={'Digite a descrição'}
          required
          type={'text'}
        />

        <SelectController
          control={control}
          label={'Área responsável'}
          name={'responsibleAreaId'}
          query={responsibleAreaQuery}
          options={listToSelect(
            responsibleAreaQuery.data ?? [],
            undefined,
            stoppingReason?.responsibleArea
          )}
          placeholder={'Selecione a área responsável'}
          required
        />
        <SelectController
          control={control}
          label={'Natureza'}
          name={'nature'}
          options={[
            { label: 'Planejado', value: Nature.PLANNED },
            { label: 'Não Planejado', value: Nature.UNPLANNED }
          ]}
          placeholder={'Selecione a área responsável'}
          required
        />

        <div className={'flex w-full items-center justify-between'}>
          <p className={'w-full'}>Situação atual do motivo de parada</p>
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
