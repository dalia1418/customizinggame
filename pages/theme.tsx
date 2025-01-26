import { useMediaQuery } from "@mantine/hooks";
import type { NextPage } from "next";
import { SmallScreen, Theme } from "../components";

const ThemePage: NextPage = () => {
  const small = useMediaQuery("(max-width: 1024px)");

  if (small) return <SmallScreen />;

  return <Theme />;
};

export default ThemePage;
