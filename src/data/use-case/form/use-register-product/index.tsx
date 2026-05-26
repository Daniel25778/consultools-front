import { yupResolver } from '@hookform/resolvers/yup';
import { Status } from 'domain/enums';
import type { Product } from 'domain/models';
import type { formReturn } from 'domain/protocol';
import { api } from 'infra/http';
import { queryClient } from 'infra/lib';
import { apiPaths } from 'main/config';
import { callToast, resolverError } from 'main/utils';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { productSchema, type ProductRequest } from 'validation/schema';

interface useRegisterProductProps {
  closeModal: () => void;
  product?: Product;
}

export const useRegisterProduct = ({
  closeModal,
  product
}: useRegisterProductProps): formReturn<ProductRequest> => {
  const formData = useForm<ProductRequest>({
    resolver: yupResolver(productSchema),
    defaultValues: (product as Product) ?? {
      status: Status.ENABLED,
      name: '',
      description: ''
    }
  });

  const onSubmit: SubmitHandler<ProductRequest> = async (data) => {
    try {
      if (product)
        await api.put({
          body: data,
          id: product.id,
          route: apiPaths.product
        });
      else
        await api.post({
          body: data,
          route: apiPaths.product
        });
      callToast.success(`Produto ${product ? 'editado' : 'cadastrado'} com sucesso!`);
      queryClient.invalidateQueries({ queryKey: ['product'] });
      closeModal();
    } catch (error) {
      resolverError(error);
    }
  };

  return { ...formData, onSubmit };
};
