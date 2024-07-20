import { Text, Container } from "@mantine/core";
import classes from "./Footer.module.css";

export function Footer() {
  return (
    <div className={classes.footer}>
      <Container size="md">
        <img
          src="../LogoMakr.png"
          alt="Logo"
          style={{ width: "140px", height: "auto" }}
        />

        <Text c="dimmed" size="sm" align="center">
          © 2020 mantine.dev. All rights reserved.
        </Text>
      </Container>
    </div>
  );
}
