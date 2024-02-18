import { Button, Flex } from "antd";
import { useAuth } from "../../context/AuthContext";

export const Dashboard = () => {
  const { logout } = useAuth();
  return (
    <Flex vertical>
      <Button
        onClick={() => {
          console.log("click");
          logout();
        }}
      >
        logout
      </Button>
    </Flex>
  );
};
