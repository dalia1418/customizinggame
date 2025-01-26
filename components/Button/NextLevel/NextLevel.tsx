import { createStyles, Button } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import Link from "next/link";
import { IconArrowBigRightLines } from "@tabler/icons";
import { useContext } from "react";
import { SessionContext, UserContext } from "../../../pages/_app";
import { addSession, addSession2 } from "../../../utils/Database";

const useStyles = createStyles((theme) => ({
  control: {
    maxWidth: "15rem",
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
}));

const NextLevel = ({
  destination,
  text,
  completeGame = false,
}: {
  destination: {} | string;
  text: string;
  completeGame?: boolean;
}) => {
  const { classes } = useStyles();
  const largeScreen = useMediaQuery("(min-width: 1400px)");
  const { user } = useContext(UserContext);
  const [session, setSession] = useContext(SessionContext);

  return (
    <Link href={destination} passHref>
      <Button
        className={classes.control}
        size={largeScreen ? "xl" : "md"}
        radius="xl"
        variant="filled"
        rightIcon={<IconArrowBigRightLines size={32} />}
        sx={{
          float: "right",
        }}
        onClick={() => {
          const newSession = {
            type: "gameplay",
            subtype: "level",
            action: completeGame ? "finish game" : "next level",
            time: Date.now(),
          };
        
          if (completeGame) {
            addSession(user.uid, JSON.stringify([...session, newSession]));
            setSession([newSession]);
          } else {
            setSession((prev: []) => [...prev, newSession]);
            addSession2(user.uid, JSON.stringify([...session, newSession]));
          }
        }}
      >
        {text}
      </Button>
    </Link>
  );
};

export { NextLevel };
