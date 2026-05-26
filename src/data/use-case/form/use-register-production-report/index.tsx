import { yupResolver } from '@hookform/resolvers/yup';
import type { ProductionReport } from 'domain/models';
import type { formReturn } from 'domain/protocol';
import { api } from 'infra/http';
import { queryClient } from 'infra/lib';
import { QueryName, apiPaths } from 'main/config';
import { callToast, resolverError } from 'main/utils';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { productionReportSchema, type ProductionReportRequest } from 'validation/schema';

interface useRegisterProductionReportProps {
  closeModal: () => void;
  productionReport?: ProductionReport;
}

export const useRegisterProductionReport = ({
  closeModal,
  productionReport
}: useRegisterProductionReportProps): formReturn<ProductionReportRequest> => {
  const formData = useForm<ProductionReportRequest>({
    resolver: yupResolver(productionReportSchema)
  });

  const onSubmit: SubmitHandler<ProductionReportRequest> = async (data) => {
    try {
      if (productionReport)
        await api.put({
          body: data,
          id: productionReport.id,
          route: apiPaths.productionReport
        });
      else
        await api.post({
          body: data,
          route: apiPaths.productionReport
        });
      callToast.success(`Apontamento ${productionReport ? 'editado' : 'cadastrado'} com sucesso!`);
      queryClient.invalidateQueries({ queryKey: [QueryName.productionReport] });
      closeModal();
    } catch (error) {
      resolverError(error);
    }
  };

  return { ...formData, onSubmit };
};
