/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpStatusCode } from 'domain/enums';
import type { ApiProps } from 'domain/protocol';
import { removeUndefined } from 'main/utils/remove-undefined';
import { store } from 'store/index';

const baseUrl = import.meta.env.VITE_API_URL;

export const fetchApi = async <T>(params: ApiProps): Promise<T> => {
  const accessToken = params.token || store.getState().persist.accessToken;

  const body: any = params.isFormData ? params.body : JSON.stringify(params.body);
  const headers = {};

  if (accessToken) Object.assign(headers, { Authorization: `Bearer ${accessToken}` });

  if (!params.isFormData)
    Object.assign(headers, {
      'Content-Type': 'application/json;charset=UTF-8'
    });

  const id = params.id ? `/${params.id}` : '';

  const queryParams =
    params.queryParams && Object.values(removeUndefined({ ...params.queryParams })).length
      ? `?${new URLSearchParams(removeUndefined({ ...params.queryParams }))}`
      : '';

  const response = await fetch(`${params.baseUrl ?? baseUrl}${params.route}${id}${queryParams}`, {
    body,
    headers,
    method: params.method
  });

  if ((response.status as unknown as HttpStatusCode) === HttpStatusCode.unauthorized) {
    window.location.href = '/';
    return null as T;
  }

  if (
    (response.status as unknown as HttpStatusCode) === HttpStatusCode.noContent ||
    (response.status as unknown as HttpStatusCode) === HttpStatusCode.created
  )
    return null as T;

  if (response.headers.get('total-pages')) {
    const res = {
      content: await response.json(),
      totalElements: Number(response.headers.get('content-range')),
      totalPages: Number(response.headers.get('total-pages'))
    };

    return res as T;
  }

  const data = await response.json();

  if (response.ok) return data;

  throw Object(data);
};
