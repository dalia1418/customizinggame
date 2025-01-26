import { createStyles, Button } from "@mantine/core";
import Link from "next/link";
import { IconArrowBackUp } from "@tabler/icons";
import { ConfirmationModal } from "../../Modals";
import { useState } from "react";
import { ConfigType } from "../../../types";

const useStyles = createStyles((theme, { top }: { top: boolean }) => ({
  control: {
    zIndex: 1000,
    position: "absolute",
    left: 5,
    bottom: !top ? 5 : "auto",
    top: top ? 5 : "auto",
    maxWidth: "10rem",
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
      backgroundColor: theme.primaryColor[3],
    },
  },
}));

const BackButton = ({
  top = false,
  label = "Back",
  confirmation = false,
  config,
}: {
  top?: boolean;
  label?: string;
  confirmation?: boolean;
  config?: ConfigType;
}) => {
  const { classes } = useStyles({ top: top });
  const [opened, setOpened] = useState(false);

  if (confirmation && config) {
    return (
      <>
        <Button
          className={classes.control}
          size="md"
          radius="xl"
          variant="outline"
          onClick={() => setOpened(true)}
          leftIcon={<IconArrowBackUp size={32} />}
        >
          {label}
        </Button>
        <ConfirmationModal
          opened={opened}
          onClose={() => setOpened(false)}
          config={config}
        />
      </>
    );
  }

  return (
    <Link href="/" passHref>
      <Button
        className={classes.control}
        size="md"
        radius="xl"
        variant="outline"
        leftIcon={<IconArrowBackUp size={32} />}
      >
        {label}
      </Button>
    </Link>
  );
};

export { BackButton };
