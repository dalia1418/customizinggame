import { createStyles } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { LightCellStyleType, LightCellType } from "../../types";
import { IconCoin } from "@tabler/icons";
import { useTimer } from "../../utils";
import { useEffect, useState } from "react";
import { getPowerup } from "./helpers";

const useStyles = createStyles(
  (theme, { size, toggled }: LightCellStyleType) => ({
    light: {
      width: size,
      aspectRatio: "1",
      borderRadius: theme.other.cellRadius,
      border: !toggled ? "1px solid black" : "none",
      backgroundColor: toggled
        ? theme.colors[theme.primaryColor][6]
        : theme.white,
      position: "absolute",
      top: "50%",
      left: "50%",
      margin: `calc(-${size} / 2)`,
      display: "grid",
      placeItems: "center",
    },
  })
);

const LightCell = ({ style, toggled = false, coin }: LightCellType) => {
  const [showCoin, setShowCoin] = useState(false);
  const [showPowerup, setShowPowerup] = useState(false);
  const [now, setNow] = useState(Date.now());

  const largeScreen = useMediaQuery("(min-width: 1400px)");
  const { classes } = useStyles({
    size: largeScreen ? "50px" : "40px",
    toggled,
  });
  const { minutes, seconds } = useTimer(now + coin.timeToShow);
  const { minutes: minutesPowerup, seconds: secondsPowerup } = useTimer(
    now + coin.timeUntilPowerup
  );

  useEffect(() => {
    if (coin.showCoin && minutes == 0 && seconds == 0) {
      setShowCoin(true);
    } else if (showCoin && !coin.showCoin) {
      setShowCoin(false);
    }
  }, [seconds]);

  useEffect(() => {
    if (coin.showPowerup && minutesPowerup == 0 && secondsPowerup == 0) {
      setShowPowerup(true);
    } else if (showPowerup && !coin.showPowerup) {
      setShowPowerup(false);
    }
  }, [secondsPowerup]);

  return (
    <div className={classes.light} style={style}>
      {showCoin && <IconCoin size={24} color="black" />}
      {showPowerup && getPowerup(coin.showPowerup)}
    </div>
  );
};

export { LightCell };
