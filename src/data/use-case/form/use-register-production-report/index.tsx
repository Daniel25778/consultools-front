import { yupResolver } from '@hookform/resolvers/yup';
import type { ProductionReportDetails } from 'domain/models';
import type { formReturn } from 'domain/protocol';
import { api } from 'infra/http';
import { queryClient } from 'infra/lib';
import { apiPaths, paths, QueryName } from 'main/config';
import { callToast, resolverError } from 'main/utils';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { productionReportSchema, type ProductionReportRequest } from 'validation/schema';

interface useRegisterProductionReportProps {
  closeModal: () => void;
  productionReport?: ProductionReportDetails;
}

export const useRegisterProductionReport = ({
  closeModal,
  productionReport
}: useRegisterProductionReportProps): formReturn<ProductionReportRequest> => {
  const formData = useForm<ProductionReportRequest>({
    resolver: yupResolver(productionReportSchema)
  });
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<ProductionReportRequest> = async (data) => {
    try {
      if (productionReport) {
        await api.put({
          body: data,
          id: productionReport.id,
          route: apiPaths.productionReport
        });
      } else {
        const { id }: { id: string } = await api.post({
          body: data,
          route: apiPaths.productionReport
        });
        navigate(paths.productionReportDetails(id));
      }

      callToast.success(`Apontamento ${productionReport ? 'editado' : 'cadastrado'} com sucesso!`);
      queryClient.invalidateQueries({ queryKey: [QueryName.productionReport] });
      closeModal();
    } catch (error) {
      resolverError(error);
    }
  };

  return { ...formData, onSubmit };
};
