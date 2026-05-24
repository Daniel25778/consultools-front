import { yupResolver } from '@hookform/resolvers/yup';
import { Status } from 'domain/enums';
import type { Shift } from 'domain/models';
import type { formReturn } from 'domain/protocol';
import { api } from 'infra/http';
import { queryClient } from 'infra/lib';
import { apiPaths, QueryName } from 'main/config';
import { resolverError } from 'main/utils';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { shiftSchema, type ShiftRequest } from 'validation/schema';

interface useRegisterShiftProps {
  closeModal: () => void;
  shift?: Shift;
}

export const useRegisterShift = ({
  closeModal,
  shift
}: useRegisterShiftProps): formReturn<ShiftRequest> => {
  const formData = useForm<ShiftRequest>({
    resolver: yupResolver(shiftSchema),
    defaultValues: {
      status: Status.ENABLED
    }
  });

  const onSubmit: SubmitHandler<ShiftRequest> = async (data) => {
    try {
      if (shift)
        await api.put({
          body: data,
          id: shift.id,
          route: apiPaths.shift
        });
      else
        await api.post({
          body: data,
          route: apiPaths.shift
        });
      toast.success(`Turno ${shift ? 'editado' : 'cadastrado'} com sucesso!`);
      queryClient.invalidateQueries({ queryKey: [QueryName.shift] });
      closeModal();
    } catch (error) {
      resolverError(error);
    }
  };

  return { ...formData, onSubmit };
};
