import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";
import { config } from "../../config";
import Button from "antd/es/button";

export const Logout = () => {
  const { token, logout } = useAuth();
  const navigate = useNavigate();

  const logOutHandler = async () => {
    try {
      await axios.post(
        `${config.apiBaseUrl}/auth/logout`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      logout();
      navigate("/login");
    } catch (error) {
      console.log("something went wrong. ", error);
    }
  };
  return (
    <Button type="default" onClick={logOutHandler}>
      logout
    </Button>
  );
};
