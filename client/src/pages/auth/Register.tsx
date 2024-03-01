import { Flex, Form, Input, Checkbox, Button, Select } from "antd";
import { useAuth } from "../../context/AuthContext";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { AUTH_STATUS } from "../../types/AuthTypes";
import axios from "axios";
import { config } from "../../config";
import { MdOutlineEmail } from "react-icons/md";

const { Option } = Select;

export const Register = () => {
  const navigate = useNavigate();
  const { setAuthenticationStatus, login } = useAuth();
  const onFinish = async (values: any) => {
    const newUser = {
      name: values.name,
      email: values.email,
      contact_number: values.contact_number,
      password: values.password,
    };

    try {
      setAuthenticationStatus(AUTH_STATUS.PENDING);
      const response = await axios.post(
        `${config.apiBaseUrl}/auth/register`,
        newUser,
        {
          withCredentials: true,
        }
      );
      setAuthenticationStatus(AUTH_STATUS.SUCCEEDED);
      const { user, token, expiresAt } = response.data;

      // use login also becasue of same data return
      login(user, token, expiresAt);
      navigate("/");
    } catch (error) {
      setAuthenticationStatus(AUTH_STATUS.FAILED);
    }
  };

  return (
    <Flex
      justify="center"
      align="center"
      style={{ height: "100vh", padding: 8 }}
    >
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        style={{ width: "100%", maxWidth: 300 }}
      >
        <Form.Item
          name="name"
          rules={[{ required: true, message: "Please input your Username!" }]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Username"
          />
        </Form.Item>
        <Form.Item
          name="email"
          rules={[
            {
              type: "email",
              required: true,
              message: "The input is not valid E-mail!",
            },
          ]}
        >
          <Input prefix={<MdOutlineEmail />} placeholder="Email" />
        </Form.Item>
        <Form.Item
          name="contact_number"
          rules={[
            { required: true, message: "Please input your phone number!" },
          ]}
        >
          <Input addonBefore={prefixSelector} style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your Password!" }]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item
          name="agreement"
          valuePropName="checked"
          rules={[
            {
              validator: (_, value) =>
                value
                  ? Promise.resolve()
                  : Promise.reject(new Error("Should accept agreement")),
            },
          ]}
        >
          <Checkbox>
            I have read the <a href="">agreement</a>
          </Checkbox>
        </Form.Item>

        <Form.Item>
          <Button
            style={{ width: "100%" }}
            type="primary"
            htmlType="submit"
            className="register-form-button"
          >
            Register
          </Button>
          Or <Link to="/login">Login here!</Link>
        </Form.Item>
      </Form>
    </Flex>
  );
};

const prefixSelector = (
  <Form.Item name="prefix" noStyle>
    <Select style={{ width: 70 }}>
      <Option value="86">+86</Option>
      <Option value="87">+87</Option>
    </Select>
  </Form.Item>
);
