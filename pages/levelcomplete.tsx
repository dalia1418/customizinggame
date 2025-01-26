import { useMediaQuery } from "@mantine/hooks";
import type { NextPage } from "next";
import { LevelComplete, SmallScreen, Waves } from "../components";

const LevelCompletePage: NextPage = () => {
  const small = useMediaQuery("(max-width: 1024px)");

  if (small) return <SmallScreen />;

  return (
    <>
      <LevelComplete />
      <Waves />
    </>
  );
};

export default LevelCompletePage;
