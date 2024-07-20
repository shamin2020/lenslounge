import {
  Text,
  Avatar,
  Group,
  TypographyStylesProvider,
  Paper,
} from "@mantine/core";
import classes from "./CommentHtml.module.css";

export function CommentHtml({ name, time, src, comment }) {
  return (
    <Paper withBorder radius="md" className={classes.comment}>
      <Group>
        <Avatar src={src} alt={name} radius="xl" />
        <div>
          <Text fz="sm">{name}</Text>
          <Text fz="xs" c="dimmed">
            {time}
          </Text>
        </div>
      </Group>
      <TypographyStylesProvider className={classes.body}>
        <div className={classes.content}>{comment}</div>
      </TypographyStylesProvider>
    </Paper>
  );
}
