import DOMAIN from "../../services/endpoint";
import axios from "axios";
import { ArticleCardImage } from "../../components/misc/ArticleCardImage";
import { SimpleGrid, Container } from "@mantine/core";
import { useLoaderData, defer, Await } from "react-router-dom";
import { Suspense } from "react";
import LoadingSpinner from "../../components/misc/LoadingSpinner";

export const PostPage = () => {
  const { posts } = useLoaderData();

  return (
    <Container>
      <SimpleGrid cols={3}>
        <Suspense fallback={<LoadingSpinner />}>
          <Await resolve={posts}>
            {(resolvedPosts) =>
              resolvedPosts?.map((post) => (
                <ArticleCardImage key={post.title} {...post} />
              ))
            }
          </Await>
        </Suspense>
      </SimpleGrid>
    </Container>
  );
};

export const postsLoader = async () => {
  const postsPromise = axios.get(`${DOMAIN}/api/posts`).then((res) => res.data);
  return defer({ posts: postsPromise });
};
