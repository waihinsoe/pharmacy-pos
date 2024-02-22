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

export interface InitialStateType {
  user: User | null;
  token: string | null;
  expiresAt: Date | null;
  isAuthenticated: boolean;
  status: AUTH_STATUS;
}

export interface AuthContextType extends InitialStateType {
  login: (user: User, token: string, expiresAt: Date) => void;
  logout: () => void;
  setAuthenticationStatus: (status: AUTH_STATUS) => void;
}

export type AuthReducerAction =
  | {
      type: "login";
      payload: {
        user: User;
        token: string;
        expiresAt: Date;
      };
    }
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
