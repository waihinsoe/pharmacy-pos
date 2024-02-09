import React from "react";
import { useAuth } from "../../context/AuthContext";
import { Button } from "antd";

export const Dashboard = () => {
  const { logout } = useAuth();
  return (
    <div>
      <Button onClick={logout}>logout</Button>
    </div>
  );
};
