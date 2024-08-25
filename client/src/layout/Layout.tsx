import { Outlet } from "react-router-dom";
import { DashboardTopBar } from "../components/navbar/DashboardTopBar";
import { DashboardSideBar } from "../components/navbar/DashboardSideBar";
import { useState } from "react";
import { Flex } from "antd";
import { Toaster } from "react-hot-toast";

export const Layout = () => {
  const [collapsed, setCollapsed] = useState(true);

  return (
    <Flex vertical style={{ height: "100vh" }}>
      <DashboardTopBar collapsed={collapsed} setCollapsed={setCollapsed} />
      <Flex flex={1}>
        <DashboardSideBar collapsed={collapsed} />
        <main style={{ padding: 16, flex: 1 }}>
          <Outlet />
        </main>
      </Flex>
      <Toaster />
    </Flex>
  );
};
