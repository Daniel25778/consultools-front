export interface LoginPayload {
  access_token: string;
  user: User;
}

export interface User {
  id: string;
  username: string;
  created_at: Date;
  updated_at: Date;
  deleted_at?: Date;
}
