import { useContext } from "react";
import Image from "next/image";
import {
  useMantineTheme,
  createStyles,
  Title,
  Stack,
  Button,
} from "@mantine/core";
import { Carousel } from "@mantine/carousel";
import { SessionContext, ThemeContext } from "../../pages/_app";
import hand from "../../public/hand.png";
import hand2 from "../../public/hand2.png";
import hand3 from "../../public/hand3.png";
import hand4 from "../../public/hand4.jpg";

const useStyles = createStyles((theme) => ({
  heading: {
    marginBottom: 24,
    "@media (max-width: 1400px)": {
      fontSize: 20,
    },
  },
}));

const images = [hand, hand2, hand3, hand4];

const HandCarousel = () => {
  const { classes } = useStyles();

  const theme = useMantineTheme();
  const setTheme = useContext(ThemeContext);
  const [, setSession] = useContext(SessionContext);

  const slides = images.map((image, i) => (
    <Carousel.Slide key={i}>
      <Stack align="center">
        <Image src={image} alt="clock hand" height="200" width="100" />
        {theme.other.clockHand == i ? (
          <Button disabled>Equipped</Button>
        ) : (
          <Button
            size="sm"
            onClick={() => {
              setSession((prev: []) => [
                ...prev,
                {
                  type: "configuration",
                  subtype: "configure theme",
                  action: "change clock hand",
                  context: {
                    hand: i,
                  },
                  time: Date.now(),
                },
              ]);
              setTheme((prev) => ({ ...prev, clockHand: i }));
            }}
          >
            Equip
          </Button>
        )}
      </Stack>
    </Carousel.Slide>
  ));

  return (
    <>
      <Title className={classes.heading} my={32}>
        Clock Hand
      </Title>
      <Carousel
        sx={{ maxWidth: 200 }}
        mx="auto"
        withIndicators
        align="end"
        loop
        height="300px"
        styles={{
          indicator: {
            width: 12,
            height: 4,
            transition: "width 250ms ease",
            backgroundColor: theme.colors[theme.primaryColor][3],

            "&[data-active]": {
              width: 40,
              backgroundColor: theme.colors[theme.primaryColor][6],
            },
          },
        }}
      >
        {slides}
      </Carousel>
    </>
  );
};

export { HandCarousel };
