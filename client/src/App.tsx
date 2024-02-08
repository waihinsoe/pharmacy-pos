import Button from "antd/es/button";
import "./App.css";
import { MyTable } from "./components/MyTable";
import ConfigProvider from "antd/es/config-provider";

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
      <div>
        <Button type="primary">Button</Button>
        <div>
          <MyTable />
        </div>
      </div>
    </ConfigProvider>
  );
}

export default App;
