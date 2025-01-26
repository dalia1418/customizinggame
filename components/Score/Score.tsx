import { Paper, createStyles, Text, Stack } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  wrapper: {
    backgroundColor: theme.colors[theme.primaryColor][6],
    color: "white",
    minWidth: 180,
    minHeight: 80,
  },

  value: {
    fontSize: 32,
    fontWeight: 700,
    lineHeight: 1,
  },

  title: {
    fontSize: 12,
    fontWeight: 700,
    textTransform: "uppercase",
  },
}));

const Score = ({ score }: { score: number }) => {
  const { classes } = useStyles();

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
          Score
        </Text>
        <Text className={classes.value}>{score}</Text>
      </Stack>

      {/* <Stack justify="center" spacing={1} align="center" mt={10}>
        <Text size="xs" className={classes.title}>
          Points to reach next position
        </Text>
        <Text className={classes.value}>500</Text>
      </Stack> */}
    </Paper>
  );
};

export { Score };
