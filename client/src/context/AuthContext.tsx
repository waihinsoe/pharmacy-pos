import { ReactNode, createContext, useContext, useState } from "react";
import {
  User,
  LoginUserCredentials,
  AuthContextType,
  RegisterUserCredentials,
} from "../types/AuthTypes";
import axios from "axios";
import { config } from "../config";

const defaultAuthContext = {
  isLoading: true,
  user: null,
  fetchAuthData: () => {},
  login: () => {},
  register: () => {},
  logout: () => {},
};

const AuthContext = createContext<AuthContextType>(defaultAuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authData, setAuthData] = useState(defaultAuthContext);
  const accessToken = localStorage.getItem("accessToken");

  const fetchAuthData = async () => {
    const response = await axios.get(`${config.apiBaseUrl}/auth`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
  };

  const login = (userCredentials: LoginUserCredentials) => {
    const { email, password } = userCredentials;
    const isValid = email && password;
    if (!isValid) return alert("please fill all input!");
    console.log(userCredentials);
  };

  const register = async (userCredentials: RegisterUserCredentials) => {
    const { name, email, password } = userCredentials;
    const isValid = name && email && password;
    if (!isValid) return alert("please fill all input!");
    const response = await axios.post(
      `${config.apiBaseUrl}/auth/register`,
      userCredentials,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (response.status) {
      console.log(response.data);
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    console.log("calling");
    // setUser(null);
  };

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
