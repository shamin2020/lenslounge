import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import useBoundStore from "../../store/Store";
import {
  TextInput,
  PasswordInput,
  Checkbox,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Group,
  Button,
} from "@mantine/core";

const LoginPage = () => {
  const navigate = useNavigate();
  const { loginService, authLoading, user } = useBoundStore((state) => state);

  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  useEffect(() => {
    if (!!user) {
      navigate("/posts");
    }
  }, [user, navigate]);

  const onLogin = async (e) => {
    e.preventDefault();
    let email = emailRef.current?.value;
    let password = passwordRef.current?.value;
    if (!email || !password) return;
    loginService(email, password);
  };
  return (
    <Container size={420} my={40}>
      <Title align="center">Welcome back!</Title>
      <Text color="dimmed" size="sm" align="center" mt={5}>
        Do not have an account yet?{" "}
        <Anchor size="sm" component="button">
          Create account
        </Anchor>
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <form onSubmit={onLogin}>
          <TextInput
            label="Email"
            placeholder="you@mantine.dev"
            required
            ref={emailRef}
          />
          <PasswordInput
            label="Password"
            placeholder="Your password"
            required
            mt="md"
            ref={passwordRef}
          />
          <Group position="apart" mt="lg">
            <Checkbox label="Remember me" />
            <Anchor component="button" size="sm">
              Forgot password?
            </Anchor>
          </Group>
          <Button type="submit" fullWidth mt="xl" loading={authLoading}>
            Sign in
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default LoginPage;
