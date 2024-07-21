import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Container, Title, Text, Button, Image } from "@mantine/core";
import axios from "axios";
import DOMAIN from "../../services/endpoint";
import LoadingSpinner from "../../components/misc/LoadingSpinner";
import useBoundStore from "../../store/Store";

const PostDetailsPage = ({ user }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  //const { user } = useBoundStore((state) => state);

  useEffect(() => {
    const loadPostDetails = async () => {
      try {
        const postData = await postDetailsLoader({ params: { id } });
        setPost(postData);
        setLoading(false);
      } catch (error) {
        console.error("Error loading post:", error);
      }
    };

    loadPostDetails();
  }, [id]);

  const handleEdit = () => {
    navigate(`/edit-post/${id}`);
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  // Extract the author name from the email
  const authorName = post.author.email.split("@")[0];

  return (
    <Container
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "flex-start",
        gap: "20px",
      }}
    >
      <div style={{ flex: 1 }}>
        <Text size="xl" weight={500}>
          <strong>By:</strong> {authorName}
        </Text>
        <Title order={2} style={{ margin: "20px" }}>
          {post.title}
        </Title>
        <Text size="sm" color="dimmed">
          <strong>Category:</strong> {post.category}
        </Text>
        <Text style={{ marginBottom: "20px" }}>{post.content}</Text>
        {user && user.id === post.author.id && (
          <Button onClick={handleEdit} style={{ marginRight: "20px" }}>
            Edit
          </Button>
        )}
        <Button component={Link} to="/posts">
          Back to Posts
        </Button>
      </div>

      <div style={{ flex: 1 }}>
        <Image src={post.image} alt={post.title} />
      </div>
    </Container>
  );
};

export const postDetailsLoader = async ({ params }) => {
  const { id } = params;
  try {
    const response = await axios.get(`${DOMAIN}/api/posts/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching post details:", error);
    throw new Error("Error loading post details");
  }
};

export default PostDetailsPage;
