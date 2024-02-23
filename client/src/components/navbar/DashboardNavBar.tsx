import { Button, Flex } from "antd";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Logout } from "../../pages/auth/Logout";
interface Props {
  collapsed: boolean;
  setCollapsed: (value: boolean) => void;
}

export const DashboardNavBar = ({ collapsed, setCollapsed }: Props) => {
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };
  return (
    <Flex
      style={{ padding: "10px 15px", borderBottom: "1px solid #eee" }}
      justify="space-between"
      align="center"
    >
      <Button type="primary" onClick={toggleCollapsed}>
        {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </Button>
      <Logout />
    </Flex>
  );
};
