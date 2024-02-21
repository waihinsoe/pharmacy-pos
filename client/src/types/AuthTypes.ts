export interface User {
  id: number;
  name: string;
  password: string;
  contact_number: string;
  email: string;
  role: Role;
  hire_date: Date;
  created_at: Date;
  updated_at: Date;
}

export interface AuthContextType {
  user: User | null;
  token: string | null;
  expiresAt: Date | null;
  isAuthenticated: boolean;
  status: AUTH_STATUS;
  login: (user: User | null, token: string, expiresAt: Date | null) => void;
  logout: () => void;
  updateUser: () => void;
  setAuthenticationStatus: () => void;
}

type AuthAction =
  | { type: "login"; payload: { user: User; token: string; expiresAt: string } }
  | { type: "logout" }
  | { type: "updateUser"; payload: { user: User } }
  | { type: "status"; payload: { status: AUTH_STATUS } };

enum Role {
  CASHIER = "CASHIER",
  ADMIN = "ADMIN",
}

export enum AUTH_STATUS {
  PENDING = "PENDING",
  IDLE = "IDLE",
  SUCCEEDED = "SUCCEEDED",
  FAILED = "FAILED",
}
