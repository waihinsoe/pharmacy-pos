import { Button, Flex } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import socket from "../../socket/socket";

export const Dashboard = () => {
  const navigate = useNavigate();
  const [barCode, setBarcode] = useState();
  console.log(barCode);
  useEffect(() => {
    socket.connect();
    socket.on("serverResponse", (message: any) => {
      setBarcode(message);
    });

    return () => {
      socket.off("serverResponse");
    };
  });

  const sendMessage = () => {
    socket.emit("qrCodeDetected", { qrValue: "hello" });
  };
  return (
    <Flex vertical>
      <Button onClick={() => navigate("/sales/new")}>New Sale</Button>
      <Button onClick={() => sendMessage()}>send</Button>
    </Flex>
  );
};
