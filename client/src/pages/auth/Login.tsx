import { useAuth } from "../../context/AuthContext";
import { LockOutlined } from "@ant-design/icons";
import { Button, Checkbox, Flex, Form, Input } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { AUTH_STATUS } from "../../types/AuthTypes";
import axios from "axios";
import { config } from "../../config";
import { MdOutlineEmail } from "react-icons/md";
export const Login = () => {
    const { login, setAuthenticationStatus, status } = useAuth();
    const navigate = useNavigate();
    const onFinish = async (values: any) => {
        const userData = {
            email: values.email,
            password: values.password,
        };

        try {
            setAuthenticationStatus(AUTH_STATUS.PENDING);
            const response = await axios.post(
                `${config.apiBaseUrl}/auth/login`,
                userData,
                { withCredentials: true }
            );
            setAuthenticationStatus(AUTH_STATUS.SUCCEEDED);
            const { user, token, expiresAt } = response.data;
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
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: "Please input your Password!",
                        },
                    ]}
                >
                    <Input
                        prefix={
                            <LockOutlined className="site-form-item-icon" />
                        }
                        type="password"
                        placeholder="Password"
                    />
                </Form.Item>
                <Form.Item>
                    <Form.Item name="remember" valuePropName="checked" noStyle>
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item>

                    <a className="login-form-forgot" href="">
                        Forgot password
                    </a>
                </Form.Item>

                <Form.Item>
                    <Button
                        style={{ width: "100%" }}
                        type="primary"
                        htmlType="submit"
                        className="login-form-button"
                        loading={status === AUTH_STATUS.PENDING}
                    >
                        Log in
                    </Button>
                    Or <Link to="/register">register now!</Link>
                </Form.Item>
            </Form>
        </Flex>
    );
};
