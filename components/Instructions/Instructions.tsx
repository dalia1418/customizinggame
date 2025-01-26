import { useContext, useState } from "react";
import {
  Modal,
  Button,
  Title,
  ActionIcon,
  createStyles,
  useMantineTheme,
  Text,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { IconChecklist } from "@tabler/icons";
import { List } from "./List";
import { data } from "./data";
import { SessionContext } from "../../pages/_app";
import Image from "next/image";
import image from "../../public/layoutExplained.png";

const useStyles = createStyles((theme) => ({
  control: {
    transition: "all 350ms",
    "&:not(:first-of-type)": {
      marginLeft: theme.spacing.md,
    },

    "@media (max-width: 520px)": {
      height: 42,
      fontSize: theme.fontSizes.md,

      "&:not(:first-of-type)": {
        marginTop: theme.spacing.md,
        marginLeft: 0,
      },
    },

    "&:hover": {
      backgroundColor: theme.primaryColor[1],
    },
  },

  icon: {
    zIndex: 10,
    position: "absolute",
    right: 15,
    bottom: 20,
  },

  list: {
    marginBottom: 16,
    paddingInline: 8,
    maxWidth: "45ch",
  },
}));

function Instructions({ icon = false }: { icon?: boolean }) {
  const { classes } = useStyles();
  const [opened, setOpened] = useState(false);
  const theme = useMantineTheme();
  const largeScreen = useMediaQuery("(min-width: 1400px)");
  const [, setSession] = useContext(SessionContext);

  const handleOpen = () => {
    setSession((prev: []) => [
      ...prev,
      {
        type: "gameplay",
        subtype: "rules",
        action: "open rules",
        time: Date.now(),
      },
    ]);
    setOpened(true);
  };

  return (
    <>
      <Modal
        overflow="inside"
        centered
        opened={opened}
        onClose={() => setOpened(false)}
        title={
          <Text size="xl" weight="700">
            Game Rules
          </Text>
        }
        transition="rotate-left"
        transitionDuration={400}
        transitionTimingFunction="ease"
        closeButtonLabel="Close rules modal"
        size="xl"
        zIndex={9999}
      >
        <Image src={image} alt="layout" />
        <List data={data} />
      </Modal>

      {icon ? (
        <ActionIcon
          onClick={handleOpen}
          color={theme.primaryColor}
          variant="outline"
          className={classes.icon}
        >
          <IconChecklist size={64} />
        </ActionIcon>
      ) : (
        <Button
          className={classes.control}
          size={largeScreen ? "xl" : "md"}
          radius="xl"
          variant="outline"
          onClick={handleOpen}
          rightIcon={<IconChecklist size={32} />}
        >
          Game Rules
        </Button>
      )}
    </>
  );
}

export { Instructions };
