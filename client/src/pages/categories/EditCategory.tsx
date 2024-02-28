import { Button, Flex, Input, message } from "antd";
import TextArea from "antd/es/input/TextArea";
import Title from "antd/es/typography/Title";
import { useEffect, useState } from "react";
import {
  useCategory,
  useCreateCategory,
  useUpdateCategory,
} from "../../hooks/categories/useCategories";
import { useAuth } from "../../context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
// name description

export const EditCategory = () => {
  const { categoryId } = useParams();
  const navigate = useNavigate();
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
        <Button loading={isLoading} type="primary" onClick={handleUpdate}>
          Update
        </Button>
      </Flex>
    </>
  );
};
