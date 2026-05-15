import type { Role, Status } from 'domain/enums';

export interface LoginPayload {
  accessToken: string;
  user: User;
}

export interface User {
  id: string;
  role: Role;
  name: string;
  email: string;
  cpf: string;
  phone: string;
  imageUrl: string;
  status: Status;
  createdAt: string;
  updatedAt: string;
  created_at: Date;
  updated_at: Date;
  deleted_at?: Date;
}
