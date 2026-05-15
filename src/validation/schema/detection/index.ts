import type { InferType } from 'yup';
import { array, mixed, object, string } from 'yup';

export const detectionSchema = object().shape({
  images: array(mixed().required())
    .min(1, 'Selecione pelo menos 1 imagem')
    .max(20, 'Selecione no máximo 20 imagens')
    .required(),
  yoloIds: array(string().uuid().required())
    .min(1, 'Selecione pelo menos 1 modelo de yolo')
    .required()
});

export type DetectionRequest = InferType<typeof detectionSchema>;
