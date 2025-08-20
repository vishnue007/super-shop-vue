export interface User {
  _id: string;
  name: string;
  email: string;
  createdAt: string;
  lastLogin?: string;
  lastLogout?: string;
}

export interface AuthResponse {
  success: boolean;
  data?: {
    user: User;
    token: string;
  };
  message?: string;
}

export interface RegisterResponse {
  success: boolean;
  data?: {
    user: User;
  };
  message?: string;
}
