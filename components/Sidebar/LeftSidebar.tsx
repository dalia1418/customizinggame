import {
  Navbar,
  Tooltip,
  UnstyledButton,
  createStyles,
  Stack,
  Modal,
  Text,
  Group,
} from "@mantine/core";
import {
  IconBulb,
  IconArrowBackUp,
  IconRefresh,
  IconBriefcase,
} from "@tabler/icons";
import { useContext, useState } from "react";
import { SessionContext } from "../../pages/_app";
import { SidebarOptionType, SidebarType } from "../../types";
import { Inventory } from "../Inventory";
import { generateHint } from "./helpers";
import { useRouter } from 'next/router';

const useStyles = createStyles(
  (theme, { disabled }: { disabled: boolean }) => ({
    link: {
      width: 50,
      height: 50,
      borderRadius: theme.radius.md,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: theme.colors.gray[7],
      transition: "all 350ms",
      "&:hover": {
        backgroundColor: disabled
          ? theme.colors.gray[4]
          : theme.colors[theme.primaryColor][5],
        color: theme.white,
      },
    },
  })
);

function NavbarLink({
  icon: Icon,
  label,
  onClick,
  disabled,
}: SidebarOptionType) {
  const { classes } = useStyles({ disabled });
  return (
    <Group>
      <Tooltip label={label} position="right" transitionDuration={0}>
        <UnstyledButton
          onClick={onClick}
          className={classes.link}
          disabled={disabled}
        >
          <Icon stroke={1.5} size={32} />
        </UnstyledButton>
      </Tooltip>
      <Text>{label}</Text>
    </Group>
  );
}

function LeftSidebar(props: SidebarType) {
  const router = useRouter();
  const { prediction } = router.query;
  const [opened, setOpened] = useState(false);
  const [openedInventory, setOpenedInventory] = useState(false);
  const [params, setParams] = props.config;
  const [, setSession] = useContext(SessionContext);

  const { score, state, lives, level, timer, prevMove } = params;

  const data = [
    {
      icon: IconBulb,
      label: "Hint",
      onClick: () => {
        setSession((prev: []) => [
          ...prev,
          {
            type: "gameplay",
            subtype: "level",
            action: "use hint",
            context: {
              score,
              state,
              lives,
              level,
              timer,
            },
            time: Date.now(),
          },
        ]);
        setOpened(true);
      },
      disabled: false,
    },
    ...(prediction !== '0' ? [{
      icon: IconArrowBackUp,
      label: "Undo",
      onClick: () => {
        setSession((prev: []) => [
          ...prev,
          {
            type: "gameplay",
            subtype: "level",
            action: "perform undo",
            context: {
              score,
              state,
              lives,
              level,
              timer,
              prevMove,
            },
            time: Date.now(),
          },
        ]);
        props.handleUndo();
      },
      disabled: !params.prevMove,
    }] : []),
    ...(prediction !== '1' && prediction !== '0' ? [{
      icon: IconRefresh,
      label: "Reset",
      onClick: () => {
        setSession((prev: []) => [
          ...prev,
          {
            type: "gameplay",
            subtype: "level",
            action: "perform reset",
            context: {
              score,
              state,
              lives,
              level,
              timer,
              prevMove,
            },
            time: Date.now(),
          },
        ]);
        props.handleReset();
      },
      disabled: false,
    }] : []),
    {
      icon: IconBriefcase,
      label: "Inventory",
      onClick: () => {
        setSession((prev: []) => [
          ...prev,
          {
            type: "gameplay",
            subtype: "inventory",
            action: "open inventory",
            context: {},
            time: Date.now(),
          },
        ]);
        setOpenedInventory(true);
      },
      disabled: false,
    },
  ];

  const links = data.map((link, index) => (
    <NavbarLink
      {...link}
      key={link.label}
      onClick={link.onClick}
      disabled={link.disabled}
    />
  ));

  return (
    <Navbar
      {...props}
      sx={(theme) => ({
        backgroundColor: "transparent",
        border: "none",
      })}
    >
      <Navbar.Section grow mt={50}>
        <Stack justify="center" spacing={10} ml={40}>
          {links}
        </Stack>
      </Navbar.Section>
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        withCloseButton={false}
        title={`${params.numCells} Lamps Hint`}
        centered
        zIndex={9999}
      >
        <Text color="dimmed" size="sm">
          {generateHint(params.numCells)}
        </Text>
      </Modal>
      <Inventory
        config={props.config}
        inventory={props.inventory}
        opened={openedInventory}
        onClose={() => setOpenedInventory(false)}
      />
    </Navbar>
  );
}

export { LeftSidebar };
