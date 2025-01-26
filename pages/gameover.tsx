import { useMediaQuery } from "@mantine/hooks";
import type { NextPage } from "next";
import { GameOver, SmallScreen } from "../components";

const GameOverPage: NextPage = () => {
  const small = useMediaQuery("(max-width: 1024px)");

  if (small) return <SmallScreen />;

  return <GameOver />;
};

export default GameOverPage;
