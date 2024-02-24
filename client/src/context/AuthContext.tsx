import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useMemo,
  useReducer,
} from "react";

import {
  AUTH_STATUS,
  AuthContextType,
  AuthReducerAction,
  InitialStateType,
  User,
} from "../types/AuthTypes";

const initialState: InitialStateType = {
  user: null,
  token: null,
  expiresAt: null,
  isAuthenticated: false,
  status: AUTH_STATUS.PENDING,
};

const AuthContext = createContext<AuthContextType>({
  ...initialState,
  login: () => {},
  logout: () => {},
  setAuthenticationStatus: () => {},
});

const authReducer = (state: InitialStateType, action: AuthReducerAction) => {
  switch (action.type) {
    case "login": {
      return {
        user: action.payload.user,
        token: action.payload.token,
        expiresAt: action.payload.expiresAt,
        isAuthenticated: true,
        status: AUTH_STATUS.SUCCEEDED,
      };
    }

    case "logout": {
      return {
        ...initialState,
        status: AUTH_STATUS.IDLE,
      };
    }

    case "status": {
      return {
        ...state,
        status: action.payload.status,
      };
    }

    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const login = useCallback((user: User, token: string, expiresAt: Date) => {
    dispatch({
      type: "login",
      payload: {
        user,
        token,
        expiresAt,
      },
    });
  }, []);

  const logout = useCallback(() => {
    dispatch({
      type: "logout",
    });
  }, []);

  const setAuthenticationStatus = useCallback((status: AUTH_STATUS) => {
    dispatch({
      type: "status",
      payload: {
        status,
      },
    });
  }, []);

  const value = useMemo(() => {
    return { ...state, login, logout, setAuthenticationStatus };
  }, [state, setAuthenticationStatus, login, logout]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
