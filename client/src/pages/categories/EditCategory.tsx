import { Button, Flex, Input, message } from "antd";
import TextArea from "antd/es/input/TextArea";
import Title from "antd/es/typography/Title";
import { useEffect, useState } from "react";
import {
  useCategory,
  useUpdateCategory,
} from "../../hooks/categories/useCategories";
import { useAuth } from "../../context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

export const EditCategory = () => {
  const navigate = useNavigate();
  const { categoryId } = useParams();
  const { token } = useAuth();
  const {
    mutate: updateCategory,
    isLoading,
    isSuccess,
    isError,
  } = useUpdateCategory();
  const { data: currentCategory } = useCategory(
    Number(categoryId),
    token || ""
  );
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const handleUpdate = () => {
    const isValid = categoryId && name && description && token;
    if (!isValid) return toast.error("Please fill all input!");
    const id = Number(categoryId);
    const data = { name, description };
    updateCategory({ id, data, accessToken: token });
  };

  useEffect(() => {
    if (currentCategory) {
      setName(currentCategory.name);
      setDescription(currentCategory.description);
    }
  }, [currentCategory]);

  useEffect(() => {
    if (!isLoading) {
      if (isSuccess) {
        navigate(-1);
        toast.success("Category updated successfully!");
      } else if (isError) {
        // Handle error state, e.g., display a message
        toast.error("Operation failed!");
      }
    }
  }, [isLoading, isSuccess, isError, navigate]);
  return (
    <>
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
