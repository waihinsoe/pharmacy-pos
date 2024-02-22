import { Flex } from "antd";
import { Logout } from "../auth/Logout";

export const Dashboard = () => {
  return (
    <Flex vertical>
      <Logout />
    </Flex>
  );
};
