import { Paper, Group, createStyles, Stack, Text } from "@mantine/core";
import { useContext, useEffect, useState } from "react";
import { ConfigType, InventoryType } from "../../types";
import { setCharAt } from "./helpers";
import { useRouter } from "next/router";
import { showNotification } from "@mantine/notifications";
import { IconCheck } from "@tabler/icons";
import { SessionContext } from "../../pages/_app";

const useStyles = createStyles((theme) => ({
  wrapper: {
    backgroundColor: theme.colors[theme.primaryColor][6],
    marginTop: "2rem",
    color: "white",
    minWidth: 150,
    cursor: "pointer",
    transition: "all 350ms",
    "&:hover": {
      transform: "scale(1.02)",
    },
    "@media (max-width: 1400px)": {
      minWidth: 100,
      marginTop: 15,
    },
  },

  title: {
    fontSize: 25,
    fontWeight: 700,
    textTransform: "uppercase",
  },
}));

type MovesType = {
  config: ConfigType;
  inventory: InventoryType;
};

const Moves = ({ config, inventory }: MovesType) => {
  const [disabled, setDisabled] = useState(false);

  const router = useRouter();
  const [params, setParams] = config;
  const [contents, setContents] = inventory;
  const {
    handAngle,
    numCells,
    state,
    moves,
    score,
    timer,
    lives,
    level,
    levels,
    coins,
    startTime,
  } = params;

  const { classes } = useStyles();

  const [, setSession] = useContext(SessionContext);

  const handleClick = (move: number) => {
    setSession((prev: []) => [
      ...prev,
      {
        type: "gameplay",
        subtype: "level",
        action: "move hand",
        context: { magnitude: move, score, state, level },
        time: Date.now(),
      },
    ]);
    setDisabled(true);
    const newAngle = handAngle + (360 / numCells) * move;
    let newPosition = Math.round(((newAngle / 360) * numCells) % numCells);
    if (newPosition == state.length) newPosition = 0;
    const coinHit =
      coins[newPosition]?.showCoin &&
      Date.now() > startTime + coins[newPosition]?.timeToShow;
    const powerupHit =
      coins[newPosition]?.showPowerup &&
      Date.now() > startTime + coins[newPosition]?.timeUntilPowerup;
    if (powerupHit) {
      setContents([...contents, coins[newPosition]?.showPowerup]);
    }
    setParams((prev) => {
      return {
        ...prev,
        handAngle: newAngle,
        score: coinHit ? prev.score + 100 : prev.score - 10,
        prevMove: move,
        coins: prev.coins.map((coin, i) => {
          if (coinHit && i == newPosition) {
            coin.showCoin = false;
          }
          if (powerupHit && i == newPosition) {
            coin.showPowerup = "";
          }
          return coin;
        }),
      };
    });
    setTimeout(() => {
      if (coinHit) {
        setSession((prev: []) => [
          ...prev,
          {
            type: "gameplay",
            subtype: "level",
            action: "collect coin",
            context: { score, state, level },
            time: Date.now(),
          },
        ]);
        showNotification({
          message: "+100 Points!",
          disallowClose: true,
          autoClose: 2000,
          color: "green",
          icon: <IconCheck size={18} />,
        });
      }
      if (powerupHit) {
        setSession((prev: []) => [
          ...prev,
          {
            type: "gameplay",
            subtype: "inventory",
            action: "collect powerup",
            context: { score, state, level },
            time: Date.now(),
          },
        ]);
        showNotification({
          message: "You picked up a powerup!",
          disallowClose: true,
          autoClose: 2000,
          color: "green",
          icon: <IconCheck size={18} />,
        });
      }
      setParams((prev) => {
        return {
          ...prev,
          state: setCharAt(
            state,
            newPosition,
            state.charAt(newPosition) === "0" ? "1" : "0"
          ),
        };
      });
      setDisabled(false);
    }, 500);
  };

  useEffect(() => {
    if (!state.includes("0")) {
      localStorage.setItem("inventory", JSON.stringify(contents));
      router.push({
        pathname: "/levelcomplete",
        query: {
          score,
          timer: timer - 10,
          state: Array(numCells + 2).join("0"),
          lives,
          level: level + 1,
          levels,
        },
      });
    }
  }, [state]);

  return (
    <Group position="center">
      {moves.map((move) => (
        <Paper
          onClick={() => !disabled && handleClick(move)}
          key={move}
          withBorder
          p="md"
          radius="md"
          className={classes.wrapper}
          shadow="xl"
        >
          <Stack justify="center" spacing={3} align="center">
            <Text size="xs" className={classes.title}>
              {move}
            </Text>
          </Stack>
        </Paper>
      ))}
    </Group>
  );
};

export { Moves };
