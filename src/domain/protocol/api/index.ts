export interface ApiProps {
  route: unknown;
  body?: unknown;
  token?: string | null;
  id?: number | string;
  method?: 'DELETE' | 'GET' | 'PATCH' | 'POST' | 'PUT';
  queryParams?: unknown;
  baseUrl?: string;
  isFormData?: boolean;
}
