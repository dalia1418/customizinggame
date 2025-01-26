import { createStyles } from "@mantine/core";
import { IconHeart, IconHeartBroken } from "@tabler/icons";
import { ReactElement } from "react";

const useStyles = createStyles((theme) => ({
  heartIcon: {
    fill: theme.colors.red[8],
    stroke: theme.colors.red[8],
  },

  heartBrokenIcon: {
    fill: theme.colors.gray[4],
    stroke: theme.black,
  },
}));

function Hearts({ lives }: { lives: number }) {
  const { classes } = useStyles();

  const hearts: ReactElement[] = [];
  const livesLost = 3 - lives;
  for (let i = 0; i < lives; i++) {
    hearts.push(<IconHeart size={28} className={classes.heartIcon} />);
  }
  for (let i = 0; i < livesLost; i++) {
    hearts.push(
      <IconHeartBroken size={28} className={classes.heartBrokenIcon} />
    );
  }
  return <>{hearts.map((heart) => heart)}</>;
}

export { Hearts };
