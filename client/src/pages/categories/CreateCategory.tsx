import { Button, Flex, Input, message } from "antd";
import TextArea from "antd/es/input/TextArea";
import Title from "antd/es/typography/Title";
import { useState } from "react";
import { useCreateCategory } from "../../hooks/categories/useCategories";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
// name description

export const CreateCategory = () => {
  const navigate = useNavigate();
  const { token } = useAuth();
  const { mutate: createNewCategory, isLoading } = useCreateCategory();
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [messageApi, contextHolder] = message.useMessage();

  const handleCreate = () => {
    const isValid = name && description && token;
    if (!isValid) return warning();
    const data = { name, description };
    createNewCategory({
      data,
      accessToken: token || "",
    });
    // route back
    navigate(-1);
  };

  const warning = () => {
    messageApi.open({
      type: "warning",
      content: "Please fill all input!",
    });
  };

  return (
    <>
      {contextHolder}
      <Flex vertical gap={16} align="start">
        <Title level={3}>Create Category</Title>
        <Input
          placeholder="Enter category name"
          allowClear
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextArea
          placeholder="Enter description...."
          allowClear
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Button loading={isLoading} type="primary" onClick={handleCreate}>
          Create
        </Button>
      </Flex>
    </>
  );
};
