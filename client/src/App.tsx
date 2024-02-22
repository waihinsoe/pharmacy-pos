import "./App.css";
import ConfigProvider from "antd/es/config-provider";
import { Router } from "./routes/Router";
import { useAuth } from "./context/AuthContext";
import { useCallback, useEffect } from "react";
import axios from "axios";
import { config } from "./config";

function App() {
  const { login, logout, isAuthenticated, expiresAt } = useAuth();

  const refreshAccessToken = useCallback(async () => {
    console.log("refetch");
    try {
      const response = await axios.post(
        `${config.apiBaseUrl}/auth/refresh`,
        {},
        {
          withCredentials: true,
        }
      );
      const { user, accessToken, expiresAt } = response.data;
      if (response.status === 204) {
        logout();
      } else {
        console.log("refetch login");
        console.log(response.data);
        login(user, accessToken, expiresAt);
      }
    } catch (error) {
      logout();
    }
  }, [login, logout]);

  useEffect(() => {
    refreshAccessToken();
  }, [refreshAccessToken]);

  useEffect(() => {
    let refreshAccessTokenTimerId: any;
    if (isAuthenticated && expiresAt) {
      refreshAccessTokenTimerId = setTimeout(() => {
        refreshAccessToken();
      }, new Date(expiresAt).getTime() - Date.now() - 10 * 1000);
    }

    return () => {
      if (isAuthenticated && refreshAccessTokenTimerId) {
        clearTimeout(refreshAccessTokenTimerId);
      }
    };
  }, [expiresAt, isAuthenticated, refreshAccessToken]);

  return (
    <ConfigProvider
      theme={{
        token: {
          // Seed Token
          colorPrimary: "#28A745 ",

          // Alias Token
          // colorBgContainer: "#f6ffed",
        },
      }}
    >
      <Router />
    </ConfigProvider>
  );
}

export default App;
