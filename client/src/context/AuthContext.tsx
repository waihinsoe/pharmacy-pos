import { ReactNode, createContext, useContext } from "react";

import { AUTH_STATUS, AuthContextType } from "../types/AuthTypes";

const initialState: AuthContextType = {
  user: null,
  token: null,
  expiresAt: null,
  isAuthenticated: false,
  status: AUTH_STATUS.PENDING,
  login: () => {},
  logout: () => {},
  updateUser: () => {},
  setAuthenticationStatus: () => {},
};

const AuthContext = createContext<AuthContextType>(initialState);

const authReducer = (state: any, action: any) => {
  switch (action.type) {
    case "login": {
      return {
        user: action.payload.user,
      };
    }
  }
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  return (
    <AuthContext.Provider value={{ ...authData, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
