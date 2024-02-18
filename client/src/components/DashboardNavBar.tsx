import { useEffect, useState } from "react";

import type { MenuProps } from "antd";
import { Menu } from "antd";
import { useLocation, useNavigate } from "react-router-dom";

const items: MenuProps["items"] = [
  {
    label: "Dashboard",
    key: "/",
  },
  {
    label: "Sales",
    key: "/sales",
    children: [
      {
        type: "group",
        children: [
          {
            label: "Sales History",
            key: "/sales/history",
          },
        ],
      },
    ],
  },
  {
    label: "Inventory",
    key: "/inventory",
  },
  {
    label: "Customers",
    key: "/customers",
  },
  {
    label: "Suppliers",
    key: "/suppliers",
  },
  {
    label: "Reports",
    key: "/reports",
    children: [
      {
        type: "group",
        children: [
          {
            label: "Sales Reports",
            key: "/reports/sales",
          },
          {
            label: "Inventory Reports",
            key: "/reports/inventory",
          },
        ],
      },
    ],
  },
];

export const DashboardNavBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [current, setCurrent] = useState(location.pathname);

  useEffect(() => {
    setCurrent(location.pathname);
  }, [location]);

  const onClick: MenuProps["onClick"] = (e) => {
    navigate(e.key);
    setCurrent(e.key);
  };

  return (
    <Menu
      onClick={onClick}
      selectedKeys={[current]}
      mode="horizontal"
      items={items}
    />
  );
};
