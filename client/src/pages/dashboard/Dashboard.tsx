import { Button, Flex } from "antd";
import { useNavigate } from "react-router-dom";

export const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <Flex vertical>
      <Button onClick={() => navigate("/sales/new")}>New Sale</Button>
    </Flex>
  );
};
