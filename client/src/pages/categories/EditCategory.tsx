import { Button, Flex, Input, message } from "antd";
import TextArea from "antd/es/input/TextArea";
import Title from "antd/es/typography/Title";
import { useEffect, useState } from "react";
import {
  useCategory,
  useUpdateCategory,
} from "../../hooks/categories/useCategories";
import { useAuth } from "../../context/AuthContext";
import { useParams } from "react-router-dom";

export const EditCategory = () => {
  const { categoryId } = useParams();
  const { token } = useAuth();
  const { mutate: updateCategory, isLoading, isSuccess } = useUpdateCategory();
  const { data: currentCategory } = useCategory(
    Number(categoryId),
    token || ""
  );
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [messageApi, contextHolder] = message.useMessage();

  const handleUpdate = () => {
    const isValid = categoryId && name && description && token;
    if (!isValid) return warning();
    const id = Number(categoryId);
    const data = { name, description };
    updateCategory({ id, data, accessToken: token });
  };

  const warning = () => {
    messageApi.open({
      type: "warning",
      content: "Please fill all input!",
    });
  };
  const success = () => {
    messageApi.open({
      type: "success",
      content: "updated successfully!",
    });
  };

  useEffect(() => {
    if (currentCategory) {
      setName(currentCategory.name);
      setDescription(currentCategory.description);
    }
  }, [currentCategory]);

  useEffect(() => {
    if (!isLoading && isSuccess) {
      return success();
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
            onClick={handleUpdate}
          >
            Update
          </Button>
        </div>
      </Flex>
    </>
  );
};
