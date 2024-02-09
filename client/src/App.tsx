import "./App.css";
import ConfigProvider from "antd/es/config-provider";
import { Router } from "./routes/Router";

function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          // Seed Token
          colorPrimary: "#28A745 ",
          borderRadius: 2,

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
