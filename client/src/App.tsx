import Button from "antd/es/button";
import "./App.css";
import { MyTable } from "./components/MyTable";
import ConfigProvider from "antd/es/config-provider";
import axios from "axios";
import { config } from "./config";

function App() {
  const fetchData = async () => {
    const res = await axios.get(`${config.apiBaseUrl}`);
    console.log(res.data);
  };

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
        <Button onClick={fetchData} type="primary">
          fetch data
        </Button>
        <div>
          <MyTable />
        </div>
      </div>
    </ConfigProvider>
  );
}

export default App;
