import { TextInput, Button, Group, Box } from "@mantine/core";
import DOMAIN from "../../services/endpoint";
import axios from "axios";
import { useForm } from "@mantine/form";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function EditPostPage() {
  const navigate = useNavigate();
  const { id } = useParams(); // Get the post ID from the URL parameters
  const [loading, setLoading] = useState(true);

  const form = useForm({
    initialValues: {
      title: "",
      category: "",
      image: "",
      content: "",
    },
  });

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(`${DOMAIN}/api/posts/${id}`);
        const post = res.data;
        form.setValues({
          title: post.title,
          category: post.category,
          image: post.image,
          content: post.content,
        });
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch post:", error);
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  const handleUpdate = async (values) => {
    const res = await axios.put(`${DOMAIN}/api/posts/${id}`, values);
    if (res?.data.success) {
      navigate(`/posts/${id}`);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Box maw={300} mx="auto">
      <form onSubmit={form.onSubmit(handleUpdate)}>
        <TextInput
          label="Title"
          placeholder="Enter a Title"
          {...form.getInputProps("title")}
        />

        <TextInput
          label="Category"
          placeholder="Enter a Category"
          {...form.getInputProps("category")}
        />
        <TextInput
          label="Image"
          placeholder="Enter an Image"
          {...form.getInputProps("image")}
        />

        <TextInput
          label="Content"
          placeholder="Enter some content"
          {...form.getInputProps("content")}
        />

        <Group position="right" mt="md">
          <Button type="submit">Update</Button>
        </Group>
      </form>
    </Box>
  );
}

export default EditPostPage;
