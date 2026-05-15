import { callToast } from 'main/utils/call-toast';
import { errorsList } from './errors-list';

export const resolverError = (err: unknown, message?: string): void => {
  const error = err as { message: string };

  const errorMessage = errorsList?.[error?.message as ''];

  callToast.error(message ?? errorMessage ?? 'Erro na requisição');
};
