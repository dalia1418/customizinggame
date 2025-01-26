import { Paper, createStyles, Text, Stack } from "@mantine/core";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useTimer } from "../../utils";
import { ConfigType } from "../../types";
import { showNotification } from "@mantine/notifications";
import { IconAlertTriangle } from "@tabler/icons";

const useStyles = createStyles((theme) => ({
  wrapper: {
    backgroundColor: theme.colors[theme.primaryColor][6],
    color: "white",
    minWidth: "10rem",
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

type TimerType = {
  config: ConfigType;
};

const Timer = ({ config }: TimerType) => {
  const { classes } = useStyles();
  const router = useRouter();

  const [params, setParams] = config;
  const { timer, score, lives } = params;
  const [time, setTime] = useState(Date.now() + timer * 1000);
  const { minutes, seconds } = useTimer(time);

  useEffect(() => {
    setParams((prev) => {
      return {
        ...prev,
        score: Math.floor(Math.max(prev.score - timer / 60, 0)),
      };
    });

    if (minutes == 0 && (seconds == 30 || seconds == 15)) {
      showNotification({
        message: `You have ${seconds} seconds left!`,
        disallowClose: true,
        autoClose: 3000,
        color: "red",
        icon: <IconAlertTriangle size={18} />,
      });
    }

    if (minutes == 0 && seconds == 0) {
      setParams((prev) => {
        return {
          ...prev,
          lives: prev.lives - 1,
          score: prev.score - 500,
        };
      });
      setTime(Date.now() + timer * 1000);
    }
  }, [minutes, seconds]);

  useEffect(() => {
    if (lives == 0) router.push({ pathname: "/gameover", query: { score } });
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
          Timer
        </Text>
        <Text className={classes.value}>
          {minutes}:
          {seconds.toLocaleString("en-US", {
            minimumIntegerDigits: 2,
            useGrouping: false,
          })}
        </Text>
      </Stack>
    </Paper>
  );
};

export { Timer };
