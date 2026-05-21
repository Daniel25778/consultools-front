import { yupResolver } from '@hookform/resolvers/yup';
import type { Company } from 'domain/models';
import type { formReturn } from 'domain/protocol';
import { api } from 'infra/http';
import { queryClient } from 'infra/lib';
import { apiPaths } from 'main/config';
import { resolverError } from 'main/utils';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import type { CompanyRequest } from 'validation/schema';
import { companySchema } from 'validation/schema';

interface useRegisterCompanyProps {
  closeModal: () => void;
  company?: Company;
}

export const useRegisterCompany = ({
  closeModal,
  company
}: useRegisterCompanyProps): formReturn<CompanyRequest> => {
  const formData = useForm<CompanyRequest>({
    resolver: yupResolver(companySchema)
  });

  const onSubmit: SubmitHandler<CompanyRequest> = async (data) => {
    try {
      if (company)
        await api.put({
          body: data,
          id: company.id,
          route: apiPaths.company
        });
      else
        await api.post({
          body: data,
          route: apiPaths.company
        });
      toast.success(`Empresa ${company ? 'editada' : 'cadastrada'} com sucesso!`);
      queryClient.invalidateQueries({ queryKey: ['company'] });
      closeModal();
    } catch (error) {
      resolverError(error);
    }
  };

  return { ...formData, onSubmit };
};
