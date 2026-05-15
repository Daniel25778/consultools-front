import { api } from 'infra/http';
import { queryClient } from 'infra/lib/react-query';
import { resolverError } from 'main/utils';
import { toast } from 'react-toastify';
import type { Dispatch, SetStateAction } from 'react';

interface useDeleteProps {
  id: number | string;
  route: unknown;
  closeModal: () => void;
  afterDelete?: () => void;
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  queryName: string;
  successMessage: string;
  isPatch?: boolean;
}

export const useDelete = ({
  id,
  route,
  isLoading,
  closeModal,
  afterDelete,
  setIsLoading,
  queryName,
  successMessage,
  isPatch
}: useDeleteProps): { handleDelete: () => Promise<void> } => {
  const handleDelete = async (): Promise<void> => {
    if (isLoading) return;

    setIsLoading(true);

    try {
      if (isPatch) await api.patch({ id, route });
      else await api.delete({ id, route });

      await queryClient.invalidateQueries(queryName);
      toast.success(successMessage);
      if (afterDelete) afterDelete();
      closeModal();
    } catch (error) {
      resolverError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    handleDelete
  };
};
