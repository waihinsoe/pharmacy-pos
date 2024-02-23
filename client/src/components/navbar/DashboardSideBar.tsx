import React, { useEffect, useState } from "react";
import { ContainerOutlined, MailOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Menu } from "antd";
import { RxDashboard } from "react-icons/rx";
import { useLocation, useNavigate } from "react-router-dom";
import { GrHistory } from "react-icons/gr";
import { MdOutlineInventory } from "react-icons/md";
import { RiCustomerService2Line } from "react-icons/ri";
import { FaTruckLoading } from "react-icons/fa";
import { HiOutlineDocumentReport } from "react-icons/hi";

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: "group"
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem("Dashboard", "/", <RxDashboard />),
  getItem("Sale-history", "/sales/history", <GrHistory />),
  getItem("Inventory", "/inventory", <MdOutlineInventory />),
  getItem("Customers", "/customers", <RiCustomerService2Line />),
  getItem("Suppliers", "/suppliers", <FaTruckLoading />),

  getItem("Reports", "reports", <HiOutlineDocumentReport />, [
    getItem("Sales", "/reports/sales"),
    getItem("Inventory", "/reports/inventory"),
  ]),
];

interface Props {
  collapsed: boolean;
}

export const DashboardSideBar = ({ collapsed }: Props) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedKey, setSelectedKey] = useState("/");

  const onClick: MenuProps["onClick"] = (e) => {
    setSelectedKey(e.key);
    navigate(e.key);
  };
  useEffect(() => {
    setSelectedKey(location.pathname);
  }, [location]);
  return (
    <div>
      <Menu
        style={{ height: "100%" }}
        selectedKeys={[selectedKey]}
        defaultSelectedKeys={[selectedKey]}
        onClick={onClick}
        mode="inline"
        theme="light"
        inlineCollapsed={collapsed}
        items={items}
      />
    </div>
  );
};
