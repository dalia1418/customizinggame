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

      //const data = '[{"type":"configuration","subtype":"configure game","action":"visit custom configuration page","context":{},"time":1676313196578},{"type":"configuration","subtype":"level","action":"start custom game","levels":"3","lives":"3","timer":180,"state":9,"time":1676313209130},{"type":"gameplay","subtype":"level","action":"move hand","context":{"magnitude":5,"score":9943,"state":"000000000","level":0},"time":1676313226930},{"type":"gameplay","subtype":"level","action":"move hand","context":{"magnitude":5,"score":9915,"state":"000001000","level":0},"time":1676313232689},{"type":"gameplay","subtype":"level","action":"move hand","context":{"magnitude":7,"score":9893,"state":"010001000","level":0},"time":1676313237049},{"type":"gameplay","subtype":"level","action":"collect coin","context":{"score":9893,"state":"010001000","level":0},"time":1676313237552},{"type":"gameplay","subtype":"level","action":"move hand","context":{"magnitude":5,"score":9984,"state":"010001001","level":0},"time":1676313239529},{"type":"gameplay","subtype":"level","action":"collect coin","context":{"score":9984,"state":"010001001","level":0},"time":1676313240030},{"type":"gameplay","subtype":"level","action":"move hand","context":{"magnitude":7,"score":10078,"state":"010011001","level":0},"time":1676313242122},{"type":"gameplay","subtype":"level","action":"move hand","context":{"magnitude":7,"score":10062,"state":"011011001","level":0},"time":1676313243386},{"type":"gameplay","subtype":"level","action":"move hand","context":{"magnitude":7,"score":10046,"state":"111011001","level":0},"time":1676313246281},{"type":"gameplay","subtype":"level","action":"collect coin","context":{"score":10046,"state":"111011001","level":0},"time":1676313246783},{"type":"gameplay","subtype":"level","action":"move hand","context":{"magnitude":5,"score":10137,"state":"111011011","level":0},"time":1676313248346},{"type":"gameplay","subtype":"level","action":"move hand","context":{"magnitude":3,"score":10124,"state":"111111011","level":0},"time":1676313250281},{"type":"gameplay","subtype":"level","action":"collect coin","context":{"score":10124,"state":"111111011","level":0},"time":1676313250783},{"type":"gameplay","subtype":"level","action":"next level","time":1676313262745}]'

      //const response = await axios.post('http://127.0.0.1:5000/predict', { https://seriousgame.onrender.com/predict
      const response = await axios.post('http://127.0.0.1:5000/predict', { 

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
