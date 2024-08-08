import { User } from ".";

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

export enum AUTH_STATUS {
  PENDING = "PENDING",
  IDLE = "IDLE",
  SUCCEEDED = "SUCCEEDED",
  FAILED = "FAILED",
}

export type { User };
