import type { NextPage } from "next";
import Head from "next/head";
import { useContext, useEffect } from "react";
import { Floating, MainMenu, SmallScreen, Waves } from "../components";
import styles from "../styles/Home.module.css";
import { UserContext } from "./_app";
import { useRouter } from "next/router";
import { useMediaQuery } from "@mantine/hooks";

const Home: NextPage = () => {
  const router = useRouter();
  let { user } = useContext(UserContext);

  useEffect(() => {
    if (user) return;
    function callback() {
      router.push("/login");
    }
    callback();
  }, [user]);

  const small = useMediaQuery("(max-width: 1024px)");

  if (small) return <SmallScreen />;

  return (
    <div className={styles.container}>
      <Head>
        <title>Lamplighter Game</title>
        <meta
          name="description"
          content="Serious Game for Personality Assessment"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MainMenu />
      <Waves />
      <Floating />
    </div>
  );
};

export default Home;
