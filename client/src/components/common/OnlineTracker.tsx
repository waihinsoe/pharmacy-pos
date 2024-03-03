import { Flex, Typography } from "antd";
import { useEffect, useState } from "react";
import { FaWifi } from "react-icons/fa";

export const OnlineTracker = () => {
  const [isOnline, set_isOnline] = useState(true);

  const InternetErrMessagenger = () => set_isOnline(navigator.onLine === true); // for do like this shortform

  useEffect(() => {
    const interval = setInterval(InternetErrMessagenger, 2000); // call the function name only not with function with call `()`
    return () => {
      clearInterval(interval); // for component unmount stop the interval
    };
  }, []);

  return (
    <Flex align="center" gap={8} style={{ color: isOnline ? "green" : "red" }}>
      <FaWifi />
      <Typography style={{ color: isOnline ? "green" : "red" }}>
        {isOnline ? "You are online" : "You are offline"}
      </Typography>
    </Flex>
  );
};
