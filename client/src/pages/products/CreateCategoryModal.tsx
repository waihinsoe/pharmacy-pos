import Button from "antd/es/button";
import Flex from "antd/es/flex";
import Input from "antd/es/input";
import TextArea from "antd/es/input/TextArea";
import Modal from "antd/es/modal";
import Title from "antd/es/typography/Title";
import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { useCreateCategory } from "../../hooks/categories/useCategories";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";
export const CreateCategoryModal = () => {
  const { token } = useAuth();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const {
    mutate: createNewCategory,
    isLoading,
    isSuccess,
    isError,
  } = useCreateCategory();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCreate = () => {
    const isValid = name && description && token;
    if (!isValid) return toast.error("Please fill all input!");
    const data = { name, description };
    createNewCategory({ data, accessToken: token || "" });
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (!isLoading && isSuccess) {
      handleOk();
    }
  }, [isLoading, isSuccess]);

  useEffect(() => {
    if (!isLoading) {
      if (isSuccess) {
        handleOk();
        toast.success("Category created successfully!");
      } else if (isError) {
        // Handle error state, e.g., display a message
        toast.error("Operation failed!");
      }
    }
  }, [isLoading, isSuccess, isError]);

  return (
    <>
      <Button
        loading={isLoading}
        type="primary"
        icon={<FaPlus />}
        onClick={showModal}
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        create category
      </Button>
      <Modal
        closable={false}
        open={isModalOpen}
        title={<Title level={4}>Create category</Title>}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={handleCreate}>
            Create
          </Button>,
        ]}
      >
        <Flex vertical gap={16}>
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
        </Flex>
      </Modal>
    </>
  );
};
