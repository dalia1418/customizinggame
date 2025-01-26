import { useMediaQuery } from "@mantine/hooks";
import type { NextPage } from "next";
import {
  BackButton,
  ConfigurationForm,
  SmallScreen,
  Waves,
} from "../components";

const ConfigureScreen: NextPage = () => {
  const small = useMediaQuery("(max-width: 1024px)");

  if (small) return <SmallScreen />;

  return (
    <>
      <ConfigurationForm />
      <BackButton top />
      <Waves />
    </>
  );
};

export default ConfigureScreen;
