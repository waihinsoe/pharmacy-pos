import { Outlet } from "react-router-dom";
import { DashboardNavBar } from "../components/navbar/DashboardNavBar";
import { DashboardSideBar } from "../components/navbar/DashboardSideBar";
import { useState } from "react";
import { Flex } from "antd";

export const Layout = () => {
  const [collapsed, setCollapsed] = useState(true);

  return (
    <Flex vertical style={{ height: "100vh" }}>
      <DashboardNavBar collapsed={collapsed} setCollapsed={setCollapsed} />
      <Flex flex={1}>
        <DashboardSideBar collapsed={collapsed} />
        <main style={{ padding: 16, flex: 1 }}>
          <Outlet />
        </main>
      </Flex>
    </Flex>
  );
};
