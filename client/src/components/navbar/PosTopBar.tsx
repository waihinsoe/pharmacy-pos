import { Avatar, Button, Flex, Typography } from "antd";
import Search, { SearchProps } from "antd/es/input/Search";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { OnlineTracker } from "../common/OnlineTracker";

export const PosTopBar = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const onSearch: SearchProps["onSearch"] = (value, _e, info) =>
    console.log(info?.source, value);
  return (
    <Flex
      style={{ padding: "10px 15px", borderBottom: "1px solid #eee" }}
      justify="space-between"
      align="center"
    >
      <Search
        style={{ maxWidth: 400 }}
        placeholder="input search text"
        onSearch={onSearch}
        enterButton
      />
      <Flex align="center" gap={20}>
        <Flex align="center" gap={8}>
          <Avatar style={{ verticalAlign: "middle" }} gap={5}>
            {user?.name[0].toUpperCase()}
          </Avatar>
          <Typography>{user?.name}</Typography>
        </Flex>
        <OnlineTracker />
        <Button onClick={() => navigate("/")}>Dashboard</Button>
      </Flex>
    </Flex>
  );
};
