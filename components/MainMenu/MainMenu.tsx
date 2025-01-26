import {
  Container,
  createStyles,
  Title,
  Button,
  Stack,
  Code,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import {
  IconArrowBigRightLines,
  IconBrush,
  IconDeviceGamepad2,
  IconLogout,
  IconSettings,
  IconTrophy,
} from "@tabler/icons";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { SessionContext, UserContext } from "../../pages/_app";
import { addSession, hasFinishedAssessment } from "../../utils/Database";
import { logOut } from "../../utils/Firebase";
import { Instructions } from "../Instructions";
import { IntroModal } from "../Modals";

const useStyles = createStyles((theme) => ({
  wrapper: {
    position: "relative",
    paddingTop: 120,
    paddingBottom: 80,
    "@media (max-width: 1400px)": {
      paddingTop: 60,
      paddingBottom: 60,
    },
  },

  inner: {
    position: "relative",
    zIndex: 1,
  },

  title: {
    textAlign: "center",
    fontWeight: 800,
    fontSize: 56,
    letterSpacing: -1,
    color: theme.colors[theme.primaryColor][5],
    marginBottom: theme.spacing.xl * 2,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,

    "@media (max-width: 520px)": {
      fontSize: 32,
      textAlign: "left",
    },
  },

  code: {
    textAlign: "center",
    fontSize: 14,
    letterSpacing: -1,
    "@media (max-width: 520px)": {
      fontSize: 32,
      textAlign: "left",
    },
    position: "absolute",
    top: "1rem",
    left: "1rem",
  },

  controls: {
    marginTop: theme.spacing.xl,
    display: "flex",
    justifyContent: "center",

    "@media (max-width: 520px)": {
      flexDirection: "column",
    },
  },

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
  },
}));

const MainMenu = () => {
  const [opened, setOpened] = useState(true);
  const { classes } = useStyles();
  const largeScreen = useMediaQuery("(min-width: 1400px)");
  const [, setSession] = useContext(SessionContext);
  const { user } = useContext(UserContext);
  const router = useRouter();

  const handleLogOut = async () => {
    const assessmentComplete = await hasFinishedAssessment(user.uid);
    if (assessmentComplete) {
      logOut();
      router.push("/");
    } else router.push("/assessment");
  };

  return (
    <>
      <IntroModal opened={opened} onClose={() => setOpened(false)} active={1} />
      <Container className={classes.wrapper} size={1400}>
        <div className={classes.inner}>
          <Title className={classes.title} color="orange">
            Lamplighter
          </Title>
          <Code sx={{ fontWeight: 700 }} className={classes.code}>
            Alpha Version 0.7.8
          </Code>
          <Stack className={classes.controls} align="center">
            <Link href="/configure" passHref>
              <Button
                className={classes.control}
                size={largeScreen ? "xl" : "md"}
                radius="xl"
                variant="filled"
                rightIcon={<IconDeviceGamepad2 size={32} />}
                onClick={() =>
                  setSession((prev: []) => [
                    ...prev,
                    {
                      type: "configuration",
                      subtype: "configure game",
                      action: "visit custom configuration page",
                      context: {},
                      time: Date.now(),
                    },
                  ])
                }
              >
                Start
              </Button>
            </Link>
            <Link href="/leaderboard" passHref>
              <Button
                className={classes.control}
                size={largeScreen ? "xl" : "md"}
                radius="xl"
                variant="outline"
                rightIcon={<IconTrophy size={32} />}
                onClick={() =>
                  setSession((prev: []) => [
                    ...prev,
                    {
                      type: "gameplay",
                      subtype: "leaderboard",
                      action: "visit leaderboard",
                      context: {},
                      time: Date.now(),
                    },
                  ])
                }
              >
                Leaderboard
              </Button>
            </Link>
            <Instructions />
            <Link href="/theme" passHref>
              <Button
                className={classes.control}
                size={largeScreen ? "xl" : "md"}
                radius="xl"
                variant="outline"
                rightIcon={<IconBrush size={32} />}
                onClick={() =>
                  setSession((prev: []) => [
                    ...prev,
                    {
                      type: "configuration",
                      subtype: "configure theme",
                      action: "visit custom theme page",
                      context: {},
                      time: Date.now(),
                    },
                  ])
                }
              >
                Customize Theme
              </Button>
            </Link>
            <Button
              className={classes.control}
              size={largeScreen ? "xl" : "md"}
              radius="xl"
              variant="outline"
              rightIcon={<IconLogout size={28} />}
              onClick={handleLogOut}
            >
              Go to Personality Test
            </Button>
          </Stack>
        </div>
      </Container>
    </>
  );
};

export { MainMenu };
