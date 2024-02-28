import { Button, Flex, Input } from "antd";
import TextArea from "antd/es/input/TextArea";
import Title from "antd/es/typography/Title";
// name description

export const CreateCategory = () => {
  return (
    <Flex vertical gap={16} align="start">
      <Title level={3}>Create Category</Title>
      <Input placeholder="Enter category name" allowClear />
      <TextArea placeholder="Enter description...." allowClear />
      <Button type="primary">Create</Button>
    </Flex>
  );
};
