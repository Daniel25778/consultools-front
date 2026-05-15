import { yupResolver } from '@hookform/resolvers/yup';
import type { DetectionCreation } from 'domain/models';
import type { formReturn } from 'domain/protocol';
import { api } from 'infra/http';
import { queryClient } from 'infra/lib';
import { QueryName, apiPaths } from 'main/config';
import { callToast, resolverError } from 'main/utils';
import type { Dispatch, SetStateAction } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import type { DetectionRequest } from 'validation/schema';
import { detectionSchema } from 'validation/schema';

interface useDetectionProps {
  setDetectionsCreation: Dispatch<SetStateAction<DetectionCreation[]>>;
}

export const useDetection = ({
  setDetectionsCreation
}: useDetectionProps): formReturn<DetectionRequest> => {
  const formData = useForm<DetectionRequest>({
    resolver: yupResolver(detectionSchema)
  });

  const onSubmit: SubmitHandler<DetectionRequest> = async (data) => {
    try {
      setDetectionsCreation([]);
      const body = new FormData();

      data.images?.forEach((item) => body.append('images', item as string));
      data.yoloIds?.forEach((item) => body.append('yolo_ids', item as string));

      callToast.loading('Processando imagens');

      const response = await api.post<DetectionCreation[]>({
        body,
        route: apiPaths.detection,
        isFormData: true
      });

      setDetectionsCreation(response);

      await queryClient.invalidateQueries({ queryKey: [QueryName.detection] });
      formData.setValue('images', []);
      toast.dismiss();
    } catch (error) {
      toast.dismiss();
      resolverError(error);
    }
  };

  return { ...formData, onSubmit };
};
