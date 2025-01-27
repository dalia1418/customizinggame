import { Container, createStyles, Title, Text, Button } from "@mantine/core";
import { NextLevel } from "../Button";
import { Rating } from "../Rating";
import { LeaderboardModal } from "../Leaderboard";
import { useRouter } from "next/router";
import { IconArrowBackUp } from "@tabler/icons";
import { ConfirmationModal } from "../Modals";
import { useEffect, useState, useContext } from "react";
import { SessionContext, UserContext } from "../../pages/_app";
import axios from "axios";

const useStyles = createStyles((theme) => ({
  wrapper: {
    position: "relative",
    paddingTop: 100,
    paddingBottom: 80,
    minHeight: "100vh",
    "@media (max-width: 1400px)": {
      paddingTop: 60,
      paddingBottom: 40,
    },
  },

  inner: {
    paddingTop: 80,
    paddingBottom: 80,
    "@media (max-width: 1400px)": {
      paddingBlock: 40,
    },
  },

  title: {
    textAlign: "center",
    fontWeight: 800,
    fontSize: 56,
    letterSpacing: -1,
    color: theme.colors[theme.primaryColor][6],
    marginBottom: theme.spacing.xl,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,

    "@media (max-width: 1400px)": {
      fontSize: 48,
    },
  },

  score: {
    textAlign: "center",
    fontWeight: 800,
    fontSize: 36,
    color: theme.colors[theme.primaryColor][6],
  },

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

  description: {
    textAlign: "center",
    fontWeight: 700,
    fontSize: 16,
    color: theme.colors[theme.primaryColor][6],
    marginTop: theme.spacing.lg,
  },
}));

const LevelComplete = () => {
  const { classes } = useStyles();
  const [opened, setOpened] = useState(false);
  const [prediction, setPrediction] = useState<string | null>(null);

  const { query } = useRouter();

  const { session, setSession } = useContext(SessionContext);
  const { user } = useContext(UserContext);

  const { score, timer, state, lives, level, levels } = query;
  const newSession = {
    type: "gameplay",
    subtype: "level",
    action: "next level",
    time: Date.now(),
  };

  const testSessionData = Array.isArray(session) 
    ? JSON.stringify([...session, newSession]) 
    : JSON.stringify([newSession]);

  useEffect(() => {
    const inventoryJSON = localStorage.getItem("inventory");

    if (level === levels && inventoryJSON) {
      localStorage.setItem("inventory", "");
    }

    predictPersonality(testSessionData);
  }, []);

  const predictPersonality = async (sessionData: string) => {
    try {
      if (!sessionData || sessionData === '[]') {
        console.error('Empty session data');
        return;
      }

      //const response = await axios.post('http://127.0.0.1:5000/predict', { https://seriousgame.onrender.com
      const response = await axios.post('https://seriousgame.onrender.com/predict', { 

        session: sessionData,
        user: JSON.stringify(user)
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      setPrediction(response.data.prediction);
      
      console.log("Prediction response:", response.data);
      
    } catch (error) {
      console.error('Error predicting personality:', error);
      setPrediction(null);
    }
  };

  return (
    <Container className={classes.wrapper} size={1000}>
      <Title className={classes.title}>
        {level === levels ? "Game Complete!" : `Level ${level} Complete!`}
      </Title>

      <Text className={classes.score}>Score: {query.score}</Text>

      {level !== levels && (
        <Text className={classes.description}>
          Next Level: +1 Lamp and -10 seconds on the timer
        </Text>
      )}

      <Container className={classes.inner} size={800}>
        <Text className={classes.score}>Rate your level experience:</Text>
        <Rating />
      </Container>

      {level === levels ? (
        <>
          <LeaderboardModal score={query.score} />
          <NextLevel destination="/assessment" text="Assessment" completeGame />
        </>
      ) : (
        <>
          <Button
            className={classes.control}
            size="md"
            radius="xl"
            variant="outline"
            onClick={() => setOpened(true)}
            leftIcon={<IconArrowBackUp size={32} />}
          >
            Exit to Main Menu
          </Button>

          <ConfirmationModal
            opened={opened}
            onClose={() => setOpened(false)}
            query={query}
          />

          <NextLevel
            destination={{
              pathname: "/level",
              query: { 
                score, 
                timer, 
                state, 
                lives, 
                level, 
                levels,
                prediction: prediction || ''
              },
            }}
            text="Next Level"
          />
        </>
      )}
    </Container>
  );
};

export { LevelComplete };
