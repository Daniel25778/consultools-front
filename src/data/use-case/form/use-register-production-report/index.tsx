import { yupResolver } from '@hookform/resolvers/yup';
import { Role } from 'domain/enums';
import type { ProductionReportDetails } from 'domain/models';
import type { formReturn } from 'domain/protocol';
import { api } from 'infra/http';
import { queryClient } from 'infra/lib';
import { apiPaths, paths, QueryName } from 'main/config';
import { callToast, resolverError } from 'main/utils';
import { useMemo } from 'react';
import type { Resolver, SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from 'store/index';
import {
  productionReportSchema,
  productionReportSchemaWithCollaborator,
  type ProductionReportRequest
} from 'validation/schema';

interface useRegisterProductionReportProps {
  closeModal: () => void;
  companyId?: string;
  productionReport?: ProductionReportDetails;
}

const ROLES_WITH_COLLABORATOR = [Role.MANAGER, Role.CONSULTANT];

export const useRegisterProductionReport = ({
  closeModal,
  companyId,
  productionReport
}: useRegisterProductionReportProps): formReturn<ProductionReportRequest> => {
  const { user } = useAppSelector((state) => state.persist);

  const needsCollaborator = ROLES_WITH_COLLABORATOR.includes(user.role);

  const schema = useMemo(
    () => (needsCollaborator ? productionReportSchemaWithCollaborator : productionReportSchema),
    [needsCollaborator]
  );

  const formData = useForm<ProductionReportRequest>({
    resolver: yupResolver(schema) as unknown as Resolver<ProductionReportRequest>,
    defaultValues: {
      collaboratorId: productionReport?.collaborator?.id ?? ''
    }
  });

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<ProductionReportRequest> = async ({ collaboratorId, ...rest }) => {
    const body = needsCollaborator ? { ...rest, collaboratorId } : rest;

    try {
      if (productionReport) {
        await api.put({
          body,
          id: productionReport.id,
          route: apiPaths.productionReport
        });
      } else {
        const { id }: { id: string } = await api.post({
          body,
          route: apiPaths.productionReport
        });
        if (user.role === Role.CONSULTANT || user.role === Role.MANAGER) {
          navigate(paths.productionReportDetailsCompany(id, companyId!));
        } else {
          navigate(paths.productionReportDetails(id));
        }
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
