import { ReactElement, useEffect, useRef, useState } from "react";
import { Container, createStyles, useMantineTheme } from "@mantine/core";
import Image from "next/image";
import hand from "../../public/hand.png";
import hand2 from "../../public/hand2.png";
import hand3 from "../../public/hand3.png";
import hand4 from "../../public/hand4.jpg";
import { LightCell } from "../LightCell";
import { ConfigType } from "../../types";

const useStyles = createStyles((theme, { angle }: { angle: number }) => ({
  wrapper: {
    backgroundColor: theme.colors.gray[1],
    width: "23rem",
    aspectRatio: "1",
    display: "grid",
    placeItems: "center",
    borderRadius: theme.other.clockRadius,
    "@media (max-width: 1400px)": {
      marginTop: 0,
      width: "18rem",
    },
  },

  container: {
    textAlign: "center",
    width: "80%",
    display: "grid",
    placeItems: "center",
    position: "relative",
  },

  circlegraph: {
    position: "relative",
    width: "100%",
    aspectRatio: "1",
    margin: "calc(100px / 2 + 0px)",
  },

  image: {
    position: "absolute",
    top: "calc(25%)",
    transform: `rotate(${angle}deg)`,
    transformOrigin: "50% 66%",
    transition: "all 500ms ease",
  },
}));

const hands = [hand, hand2, hand3, hand4];

type ClockType = {
  config: ConfigType;
};

const Clock = ({ config }: ClockType) => {
  const [params] = config;
  const theme = useMantineTheme();
  const { handAngle, numCells, state, coins } = params;

  const { classes } = useStyles({ angle: handAngle });
  const graph = useRef(null);
  const [lights, setLights] = useState<ReactElement[]>([]);

  useEffect(() => {
    const circlegraph = graph?.current || { clientWidth: 1 };
    setLights([]);
    let angle = 360 - 90;
    let dangle = 360 / numCells;
    for (let i = 0; i < numCells; i++) {
      let circle = (
        <LightCell
          toggled={state[i] === "0" ? false : true}
          coin={coins[i]}
          style={{
            transform: `rotate(${angle}deg) translate(${
              circlegraph.clientWidth / 2
            }px) rotate(-${angle}deg)`,
          }}
        />
      );
      setLights((prev) => [...prev, circle]);
      angle += dangle;
    }
  }, [state]);

  return (
    <Container className={classes.wrapper}>
      <div className={classes.container}>
        <div className={classes.image}>
          <Image
            src={hands[theme.other.clockHand]}
            alt="clock hand"
            height="100"
            width="50"
          />
        </div>
        <div className={classes.circlegraph} ref={graph}>
          {lights.map((light) => light)}
        </div>
      </div>
    </Container>
  );
};

export { Clock };
