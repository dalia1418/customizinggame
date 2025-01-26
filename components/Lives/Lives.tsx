import { Paper, Group, createStyles, Stack, Text } from "@mantine/core";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { ConfigType } from "../../types";
import { Hearts } from "./helpers";

const useStyles = createStyles((theme) => ({
  wrapper: {
    backgroundColor: theme.colors[theme.primaryColor][6],
    color: "white",
    minWidth: 180,
  },

  value: {
    fontSize: 36,
    fontWeight: 700,
    lineHeight: 1,
  },

  title: {
    fontSize: 12,
    fontWeight: 700,
    textTransform: "uppercase",
  },

  heartIcon: {
    fill: theme.colors.red[8],
    stroke: theme.colors.red[8],
  },

  heartBrokenIcon: {
    fill: theme.colors.gray[4],
    stroke: theme.black,
  },
}));

type LivesType = {
  config: ConfigType;
};

const Lives = ({ config }: LivesType) => {
  const { classes } = useStyles();

  const [params] = config;
  const { lives, score } = params;
  const router = useRouter();

  useEffect(() => {
    if (!lives) router.push({ pathname: "/gameover", query: { score } });
  }, [lives]);

  return (
    <Paper
      withBorder
      p="md"
      radius="md"
      className={classes.wrapper}
      shadow="xl"
    >
      <Stack justify="center" spacing={3} align="center">
        <Text size="xs" className={classes.title}>
          Lives
        </Text>
        <Group position="center" spacing="lg">
          {<Hearts lives={lives} />}
        </Group>
      </Stack>
    </Paper>
  );
};

export { Lives };
