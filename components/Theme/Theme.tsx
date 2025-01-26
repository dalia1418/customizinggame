import { useContext } from "react";
import {
  ColorSwatch,
  Group,
  useMantineTheme,
  Container,
  createStyles,
  Title,
  Text,
  ScrollArea,
} from "@mantine/core";
import { SessionContext, ThemeContext } from "../../pages/_app";
import { BackButton, Waves } from "../../components";
import { Swatch } from "../Swatch/Swatch";
import { HandCarousel } from "./HandCarousel";
import { SegmentedControl } from "./SegmentedControl";

const useStyles = createStyles((theme) => ({
  wrapper: {
    marginTop: 40,
  },

  heading: {
    marginBottom: 24,
    "@media (max-width: 1400px)": {
      fontSize: 20,
    },
  },

  scrollarea: {
    height: "80vh",
  },
}));

const Theme = () => {
  const { classes } = useStyles();
  const theme = useMantineTheme();
  const setTheme = useContext(ThemeContext);
  const [, setSession] = useContext(SessionContext);

  return (
    <>
      <Container className={classes.wrapper}>
        <ScrollArea className={classes.scrollarea}>
          <Title className={classes.heading}>Color Theme</Title>
          <Group position="center" spacing="xl" mb={48}>
            <Text weight="700" color={theme.primaryColor} size={20}>
              Current Theme
            </Text>
            <ColorSwatch
              color={theme.colors[theme.primaryColor][6]}
              radius="xl"
              size={48}
            />
          </Group>
          <Swatch size={32} />
          <Title className={classes.heading} my={32}>
            Clock Shape
          </Title>
          <SegmentedControl
            value={theme.other.clockRadius}
            onChange={(value) => {
              setSession((prev: []) => [
                ...prev,
                {
                  type: "configuration",
                  subtype: "configure theme",
                  action: "change clock shape",
                  context: {
                    value,
                  },
                  time: Date.now(),
                },
              ]);
              setTheme((prev) => ({ ...prev, clockRadius: value }));
            }}
          />
          <Title className={classes.heading} my={32}>
            Cell Shape
          </Title>
          <SegmentedControl
            value={theme.other.cellRadius}
            onChange={(value) => {
              setSession((prev: []) => [
                ...prev,
                {
                  type: "configuration",
                  subtype: "configure theme",
                  action: "change cell shape",
                  context: {
                    value,
                  },
                  time: Date.now(),
                },
              ]);
              setTheme((prev) => ({ ...prev, cellRadius: value }));
            }}
          />
          <HandCarousel />
        </ScrollArea>
        <BackButton top />
      </Container>
      <Waves />
    </>
  );
};

export { Theme };
