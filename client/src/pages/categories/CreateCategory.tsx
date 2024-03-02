import { Button, Flex, Input, message } from "antd";
import TextArea from "antd/es/input/TextArea";
import Title from "antd/es/typography/Title";
import { useEffect, useState } from "react";
import { useCreateCategory } from "../../hooks/categories/useCategories";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
// name description

export const CreateCategory = () => {
  const navigate = useNavigate();
  const { token } = useAuth();
  const {
    mutate: createNewCategory,
    isLoading,
    isSuccess,
  } = useCreateCategory();
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
  };

  const warning = () => {
    messageApi.open({
      type: "warning",
      content: "Please fill all input!",
    });
  };

  useEffect(() => {
    if (!isLoading && isSuccess) {
      return navigate(-1);
    }
  }, [isLoading, isSuccess]);

  return (
    <>
      {contextHolder}
      <Flex vertical gap={16} align="start">
        <Title level={3}>Create Category</Title>

        <div
          style={{
            width: "100%",
            maxWidth: 800,
            display: "grid",
            gridTemplateColumns: "1fr 3fr",
          }}
        >
          <Title level={5}>Name</Title>
          <Input
            placeholder="Enter category name"
            allowClear
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div
          style={{
            width: "100%",
            maxWidth: 800,
            display: "grid",
            gridTemplateColumns: "1fr 3fr",
          }}
        >
          <Title level={5}>Description</Title>
          <TextArea
            placeholder="Enter description...."
            allowClear
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div
          style={{
            width: "100%",
            maxWidth: 800,
            display: "grid",
            gridTemplateColumns: "1fr 3fr",
          }}
        >
          <div></div>
          <Button
            loading={isLoading}
            type="primary"
            style={{ width: "fit-content" }}
            onClick={handleCreate}
          >
            Create
          </Button>
        </div>
      </Flex>
    </>
  );
};
