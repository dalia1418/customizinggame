import {
  Drawer,
  Text,
  useMantineTheme,
  SimpleGrid,
  createStyles,
  ActionIcon,
  Group,
  Box,
  ScrollArea,
} from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { IconCurrencyDollar, IconPlayerPlay, IconCheck } from "@tabler/icons";
import { useContext } from "react";
import { SessionContext } from "../../pages/_app";
import { ConfigType, InventoryType } from "../../types";
import { getPowerup } from "../LightCell/helpers";

const useStyles = createStyles((theme) => ({
  item: {
    backgroundColor: theme.colors[theme.primaryColor][1],
    width: "100px",
    aspectRatio: "1",
    borderRadius: "8px",
    marginInline: "auto",
    display: "grid",
    placeItems: "center",
  },

  hint: {
    position: "absolute",
    padding: theme.spacing.md,
    margin: theme.spacing.md,
    backgroundColor: theme.colors[theme.primaryColor][1],
    borderRadius: "8px",
    left: 0,
    right: 0,
    bottom: 10,
    marginLeft: "auto",
    marginRight: "auto",
    width: "90%",
  },
}));

type InventoryComponentType = {
  opened: boolean;
  onClose: () => void;
  inventory: InventoryType;
  config: ConfigType;
};

const Inventory = ({
  opened,
  onClose,
  inventory,
  config,
}: InventoryComponentType) => {
  const theme = useMantineTheme();
  const { classes } = useStyles();
  const [contents, setContents] = inventory;
  const [params, setParams] = config;
  const [, setSession] = useContext(SessionContext);

  const handleSell = (i: number) => {
    setSession((prev: []) => [
      ...prev,
      {
        type: "gameplay",
        subtype: "inventory",
        action: "sell powerup",
        context: {
          timer: params.timer,
          score: params.score,
          state: params.score,
          lives: params.lives,
        },
        time: Date.now(),
      },
    ]);
    setContents(contents.filter((item, index) => index != i));
    setParams((prev) => ({ ...prev, score: prev.score + 200 }));
    showNotification({
      id: "hello-there",
      autoClose: 3000,
      message: "You sold the powerup for 200 points!",
      color: "green",
      icon: <IconCheck size={18} />,
    });
  };

  const handlePowerupUse = (item: string, i: number) => {
    setSession((prev: []) => [
      ...prev,
      {
        type: "gameplay",
        subtype: "inventory",
        action: "use powerup",
        context: {
          timer: params.timer,
          score: params.score,
          state: params.score,
          lives: params.lives,
        },
        time: Date.now(),
      },
    ]);
    setContents(contents.filter((item, index) => index != i));
    switch (item) {
      case "heart":
        setParams((prev) => ({ ...prev, lives: Math.min(3, prev.lives + 1) }));
        showNotification({
          id: "hello-there",
          autoClose: 3000,
          message: "You got an extra life!",
          color: "green",
          icon: <IconCheck size={18} />,
        });
        break;
      case "time":
        setParams((prev) => ({ ...prev, timer: prev.timer + 5 }));
        showNotification({
          id: "hello-there",
          autoClose: 3000,
          message: "You got 5 extra seconds next level!",
          color: "green",
          icon: <IconCheck size={18} />,
        });
        break;
      default:
        break;
    }
  };

  return (
    <Drawer
      opened={opened}
      onClose={onClose}
      title={
        <Text size="xl" weight="700">
          Inventory
        </Text>
      }
      padding="xl"
      size="lg"
      position="right"
      overlayColor={theme.colors.gray[2]}
      overlayOpacity={0.55}
      overlayBlur={3}
    >
      <ScrollArea sx={{ height: "60vh", textAlign: "center" }}>
        <SimpleGrid cols={2}>
          {contents?.map((item, i) => {
            return (
              <div className={classes.item} key={i}>
                {getPowerup(item)}
                <Group>
                  <ActionIcon
                    variant="light"
                    color="blue"
                    title="Use"
                    onClick={() => handlePowerupUse(item, i)}
                  >
                    <IconPlayerPlay size={12} />
                  </ActionIcon>
                  <ActionIcon
                    variant="light"
                    color="blue"
                    title="Sell"
                    onClick={() => handleSell(i)}
                  >
                    <IconCurrencyDollar size={12} />
                  </ActionIcon>
                </Group>
              </div>
            );
          })}
        </SimpleGrid>
        {contents.length == 0 && "Your inventory is empty!"}
      </ScrollArea>
      <Box className={classes.hint}>
        <Text>
          This is where your inventory items are stored. For each item you can
          choose to use it or sell it for 200 points.
        </Text>
      </Box>
    </Drawer>
  );
};

export { Inventory };
