import {
  Box,
  Container,
  createStyles,
  ScrollArea,
  Text,
  Title,
} from "@mantine/core";

const useStyles = createStyles((theme) => ({
  wrapper: {
    paddingTop: theme.spacing.xl,
  },
  section: {
    paddingBottom: theme.spacing.md,
    marginBottom: theme.spacing.md,
    maxWidth: "70ch",
    margin: "0 auto",
    textAlign: "justify",
  },

  title: {
    fontSize: 24,
    marginBottom: theme.spacing.sm,
  },

  text: {
    lineHeight: 2,
  },

  highlight: {
    position: "relative",
    display: "inline",
    backgroundColor: theme.fn.variant({
      variant: "light",
      color: theme.primaryColor,
    }).background,
    borderRadius: theme.radius.sm,
    padding: "2px 8px",
  },
}));

const Highlight = ({ children }: { children: string }) => {
  const { classes } = useStyles();
  return <Text className={classes.highlight}>{children}</Text>;
};

const Heading = ({ children }: { children: string }) => {
  const { classes } = useStyles();
  return <Title className={classes.title}>{children}</Title>;
};

const Paragraph = ({ children }: { children: any }) => {
  const { classes } = useStyles();
  return <Text className={classes.text}>{children}</Text>;
};

const Section = ({ children, id }: { children: any; id: string }) => {
  const { classes } = useStyles();
  return (
    <Box className={classes.section} id={id}>
      {children}
    </Box>
  );
};

const Content = () => {
  const { classes } = useStyles();

  return (
    <Container className={classes.wrapper}>
      <ScrollArea sx={{ height: "85vh" }}>
        <Section id="personality">
          <Heading>Personality Profiling</Heading>
          <Paragraph>
            It is the process of{" "}
            <Highlight>evaluating one’s personality</Highlight> in the aim of
            getting a better understanding of one’s{" "}
            <Highlight> attributes, strengths, and weaknesses</Highlight> (ten
            Berge and De Raad, 2002).
          </Paragraph>
        </Section>
        <Section id="problem">
          <Heading>Problem with Common Profiling Techniques</Heading>
          <Paragraph>
            The most prevalent and <Highlight>fatal flaw</Highlight> depicted in
            common personality profiling techniques, such as interviews and
            questionnaires, is the{" "}
            <Highlight>vulnerability against fake responses.</Highlight>
            Research found that the pattern of faking corresponds with what an
            applicant might guess are the most important characteristics of the
            job. This is a concept known as{" "}
            <Highlight>Social Desirability Bias (SDB)</Highlight> which is the
            inclination of people to display a positive self-image (Grimm,
            2010).
          </Paragraph>
        </Section>
        <Section id="games">
          <Heading>Games as a Medium for Personality Assessment</Heading>
          <Paragraph>
            The greatest concept about games is that it is possible for every
            player to have a <Highlight>unique gameplay experience</Highlight>{" "}
            due to differing behaviors and patterns, and it is this notion which
            allows games to be a valuable tool for identifying personality
            aspects through <Highlight>analyzing player behavior</Highlight>{" "}
            (Lankveld et al. 2011). Furthermore, as a medium of interaction,
            games are flexible and give way to various opportunities to expose
            different gameplay elements to players.
          </Paragraph>
        </Section>
        <Section id="models">
          <Heading>Personality Models</Heading>
          <Paragraph>
            There are many proposed models which divide the concept of
            personality into <Highlight>a set of characteristics</Highlight>,
            each attributed to a certain trait in a person’s personality, and
            the combination of two or more of these characteristics can be used
            to provide a final verdict about a person’s behavior. In research
            conducted by Zulkifly (2019), it was found that the{" "}
            <Highlight>Five-Factor Model (FFM)</Highlight> was by far the most
            prominently used model of personality, with more than 50% of
            literature reviews out of 147 papers in the top 5 personality
            journals mentioning it. Therefore, it will also be the model we will
            use for this experiment.
          </Paragraph>
        </Section>
        <Section id="ffm">
          <Heading>The Five-Factor Model</Heading>
          <Paragraph>
            The FFM divides personality into five distinct dimensions, namely
            <Highlight>
              Openness, Conscientiousness, Extraversion, Agreeableness, and
              Neuroticism.
            </Highlight>{" "}
            Each dimension is a spectrum and at the end of the day, a person
            will always lie somewhere between the two extremes. Each broad
            dimension is divided into six facets, and it is these individual
            facets which are tested and provide a relevant domain score (Costa &
            McCrae, 1995). The test results of each of these facets are combined
            to place the person on the{" "}
            <Highlight>spectrum of the respective dimension.</Highlight>
            One’s position on the spectrums can be used to provide a consensus
            on some aspects of one’s personality and can be used, for example,
            by job recruitment to determine if a person is fit for a specific
            job.
          </Paragraph>
        </Section>
      </ScrollArea>
    </Container>
  );
};

export { Content };
