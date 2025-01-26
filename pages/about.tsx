import { AppShell } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import type { NextPage } from "next";
import { AboutNavbar, Content, SmallScreen } from "../components";

const AboutScreen: NextPage = () => {
  const small = useMediaQuery("(max-width: 1024px)");

  if (small) return <SmallScreen />;
  return (
    <>
      <AppShell
        navbar={<AboutNavbar width={{ base: 250 }} height={"100vh"} p="md" />}
      >
        <Content />
      </AppShell>
    </>
  );
};

export default AboutScreen;
