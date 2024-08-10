import Button from "antd/es/button";
import Flex from "antd/es/flex";
import Input from "antd/es/input";
import TextArea from "antd/es/input/TextArea";
import message from "antd/es/message";
import Modal from "antd/es/modal";
import Title from "antd/es/typography/Title";
import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { useCreateCategory } from "../../hooks/categories/useCategories";
import { useAuth } from "../../context/AuthContext";
export const CreateCategoryModal = () => {
  const { token } = useAuth();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const {
    mutate: createNewCategory,
    isLoading,
    isSuccess,
  } = useCreateCategory();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const handleCreate = () => {
    const isValid = name && description && token;
    if (!isValid) return warning();
    const data = { name, description };
    createNewCategory({ data, accessToken: token || "" });
  };

  const warning = () => {
    messageApi.open({
      type: "warning",
      content: "Please fill all input!",
    });
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

  return (
    <>
      {contextHolder}
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
