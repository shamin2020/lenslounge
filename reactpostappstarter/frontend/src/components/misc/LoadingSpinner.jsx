import React from "react";
import { Center, Loader } from "@mantine/core";

const LoadingSpinner = () => {
  console.log("loader");
  return (
    <Center style={{ margin: "auto" }}>
      <Loader size="xl" variant="dots" />
    </Center>
  );
};
export default LoadingSpinner;
