import { Container, createStyles, Title, Text } from "@mantine/core";
import { useRouter } from "next/router";
import { NextLevel } from "../Button";
import { Rating } from "../Rating";

const useStyles = createStyles((theme) => ({
  wrapper: {
    position: "relative",
    paddingTop: 100,
    paddingBottom: 80,
    maxHeight: "100vh",
    "@media (max-width: 755px)": {
      paddingTop: 80,
      paddingBottom: 60,
    },
  },

  inner: {
    paddingTop: 80,
    paddingBottom: 80,
  },

  title: {
    textAlign: "center",
    fontWeight: 800,
    fontSize: 56,
    letterSpacing: -1,
    color: theme.colors[theme.primaryColor][6],
    marginBottom: theme.spacing.xl,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,

    "@media (max-width: 520px)": {
      fontSize: 32,
      textAlign: "left",
    },
  },

  score: {
    textAlign: "center",
    fontWeight: 800,
    fontSize: 36,
  },
}));

const GameOver = () => {
  const { classes } = useStyles();

  const { query } = useRouter();

  return (
    <Container className={classes.wrapper} size={1000}>
      <Title className={classes.title}>Game Over!</Title>
      <Text className={classes.score}>Final Score: {query.score}</Text>
      <Container className={classes.inner} size={800}>
        <Text className={classes.score}>Rate your level experience:</Text>
        <Rating />
      </Container>
      <NextLevel destination="/" text="Go Home" />
    </Container>
  );
};

export { GameOver };
