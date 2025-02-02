import {
  Box,
  Container,
  createStyles,
  Title,
  Text,
  Slider,
  Group,
  Button,
  Center,
  useMantineTheme,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useMediaQuery } from "@mantine/hooks";
import {
  IconArrowBigRightLines,
  IconClock,
  IconHandFinger,
  IconHearts,
  IconSkull,
} from "@tabler/icons";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { SessionContext } from "../../pages/_app";
import { SliderOption } from "./SliderOption";

const useStyles = createStyles((theme) => ({
  wrapper: {
    position: "relative",
    paddingTop: 50,
    paddingBottom: 10,
    "@media (max-width: 1400px)": {
      paddingTop: 20,
    },
  },

  title: {
    textAlign: "center",
    fontWeight: 800,
    fontSize: 48,
    letterSpacing: -1,
    color: theme.colors[theme.primaryColor][6],
    marginBottom: theme.spacing.md,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,

    "@media (max-width: 520px)": {
      fontSize: 32,
      textAlign: "left",
    },
  },

  description: {
    textAlign: "center",
    marginBottom: theme.spacing.xl * 2,
    "@media (max-width: 1400px)": {
      fontSize: theme.fontSizes.sm,
    },
  },

  input: {
    marginBlock: theme.spacing.lg,
  },
}));

const ConfigurationForm = () => {
  const theme = useMantineTheme();
  const largeScreen = useMediaQuery("(min-width: 1400px)");
  const { classes } = useStyles();
  const [timeValue, setTimeValue] = useState(50);
  const [cellValue, setCellValue] = useState(40);
  const [, setSession] = useContext(SessionContext);

  const router = useRouter();

  const form = useForm({
    initialValues: {
      lives: "3",
      levels: "2",
    },
  });

  const changeLevelsValue = (value: any) => {
    form.setFieldValue("levels", value);
    setSession((prev: []) => [
      ...prev,
      {
        type: "configuration",
        subtype: "configure difficulty",
        action: "change levels count",
        levels: value,
        time: Date.now(),
      },
    ]);
  };

  const changeLivesValue = (value: any) => {
    form.setFieldValue("lives", value);
    setSession((prev: []) => [
      ...prev,
      {
        type: "configuration",
        subtype: "configure difficulty",
        action: "change lives count",
        lives: value,
        time: Date.now(),
      },
    ]);
  };

  const changeTimeValue = (value: number) => {
    setTimeValue(value);
    setSession((prev: []) => [
      ...prev,
      {
        type: "configuration",
        subtype: "configure difficulty",
        action: "change timer",
        timer: value * 2.4 + 60,
        time: Date.now(),
      },
    ]);
  };

  const changeCellValue = (value: number) => {
    setCellValue(value);
    setSession((prev: []) => [
      ...prev,
      {
        type: "configuration",
        subtype: "configure difficulty",
        action: "change cell count",
        state: (cellValue / 100) * 5 + 7,
        time: Date.now(),
      },
    ]);
  };

  const handleSubmit = (values: { lives: string; levels: string }) => {
    setSession((prev: []) => [
      ...prev,
      {
        type: "configuration",
        subtype: "level",
        action: "start custom game",
        levels: values.levels,
        lives: values.lives,
        timer: timeValue * 2.4 + 60,
        state: (cellValue / 100) * 5 + 7,
        time: Date.now(),
      },
    ]);

    router.push({
      pathname: "/level",
      query: {
        levels: values.levels,
        lives: values.lives,
        timer: timeValue * 2.4 + 60,
        state: Array((cellValue / 100) * 5 + 8).join("0"),
      },
    });
  };

  return (
    <Container className={classes.wrapper}>
      <Title className={classes.title}>Initial Level Configuration</Title>

      <Container size={600}>
        <Text size="lg" className={classes.description}>
          These will be the initial configuration for the first level.
          Subsequent levels will adaptive base on your personality trait.
        </Text>
      </Container>

      <Box sx={{ maxWidth: 600 }} mx="auto">
        <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
          <Group grow className={classes.input} style={{ display: 'none' }}>
            <Text size="xl" ml="md" weight="800">
              Number of Levels:
            </Text>
            <SliderOption
              data={[
                {
                  label: (
                    <Center>
                      <Box ml={10}>2</Box>
                    </Center>
                  ),
                  value: "2",
                },
              ]}
              {...form.getInputProps("levels")}
              onChange={changeLevelsValue}
            />
          </Group>
          
          <Group grow className={classes.input}>
            <Text size="xl" ml="md" weight="800">
              Number of Lives:
            </Text>
            <SliderOption
              data={[
                {
                  label: (
                    <Center>
                      <IconHearts size={24} />
                      <Box ml={10}>3 Lives</Box>
                    </Center>
                  ),
                  value: "3",
                },
                {
                  label: (
                    <Center>
                      <IconSkull size={24} />
                      <Box ml={10}>1 life</Box>
                    </Center>
                  ),
                  value: "1",
                },
              ]}
              {...form.getInputProps("lives")}
              onChange={changeLivesValue}
            />
          </Group>

          <Group grow className={classes.input}>
            <Text size="xl">
              Level Timer: <b>{timeValue * 2.4 + 60} seconds</b>
            </Text>
            <Slider
              value={timeValue}
              onChange={changeTimeValue}
              label={(value) => `${value * 2.4 + 60} secs`}
              color={theme.primaryColor}
              thumbChildren={<IconClock size={16} />}
              thumbSize={26}
              styles={{ thumb: { borderWidth: 2, padding: 3 } }}
              marks={[
                { value: 0, label: "1 min" },
                { value: 25, label: "2 mins" },
                { value: 50, label: "3 mins" },
                { value: 75, label: "4 mins" },
                { value: 100, label: "5 mins" },
              ]}
              step={25}
            />
          </Group>

          <Group grow className={classes.input}>
            <Text size="xl">
              Number of Lamps: <b>{`${(cellValue / 100) * 5 + 7} cells`}</b>
            </Text>
            <Slider
              value={cellValue}
              onChange={changeCellValue}
              label={(value) => `${(value / 100) * 5 + 7} cells`}
              color={theme.primaryColor}
              thumbChildren={<IconHandFinger size={16} />}
              thumbSize={26}
              styles={{ thumb: { borderWidth: 2, padding: 3 } }}
              marks={[
                { value: 0, label: "7" },
                { value: 20, label: "8" },
                { value: 40, label: "9" },
                { value: 60, label: "10" },
                { value: 80, label: "11" },
                { value: 100, label: "12" },
              ]}
              step={20}
            />
          </Group>

          <Group className={classes.input} position="right">
            <Button
              type="submit"
              variant="filled"
              size={largeScreen ? "xl" : "md"}
              radius="xl"
              mt="xl"
              rightIcon={<IconArrowBigRightLines size={32} />}
            >
              Start
            </Button>
          </Group>
        </form>
      </Box>
    </Container>
  );
};

export { ConfigurationForm };
