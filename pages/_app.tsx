import "../styles/globals.css";
import { AppProps } from "next/app";
import { onAuthStateChanged } from "firebase/auth";
import Head from "next/head";
import { MantineProvider } from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { auth } from "../utils/Firebase";

export const ThemeContext = createContext<
  Dispatch<
    SetStateAction<{
      primaryColor: string;
      clockRadius: string;
      cellRadius: string;
      clockHand: number;
    }>
  >
>(() => {});

export const UserContext = createContext<any>(null);

export const SessionContext = createContext<any>(null);

export default function App(props: AppProps) {
  const { Component, pageProps } = props;
  const [theme, setTheme] = useState({
    primaryColor: "blue",
    clockRadius: "50%",
    cellRadius: "50%",
    clockHand: 0,
  });

  const [user, setUser] = useState<any>(null);
  const value = { user, setUser };

  const [session, setSession] = useState<any>([]);

  useEffect(() => {
    function getUser() {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setUser(user);
        } else {
          setSession([]);
          setUser(null);
        }
      });
    }

    getUser();
  }, []);

  return (
    <>
      <Head>
        <title>Lamplighter</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>

      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          /** Put your mantine theme override here */
          colorScheme: "light",
          primaryColor: theme.primaryColor,
          other: {
            clockRadius: theme.clockRadius,
            cellRadius: theme.cellRadius,
            clockHand: theme.clockHand,
          },
        }}
      >
        <NotificationsProvider>
          <SessionContext.Provider value={[session, setSession]}>
            <UserContext.Provider value={value}>
              <ThemeContext.Provider value={setTheme}>
                <Component {...pageProps} />
              </ThemeContext.Provider>
            </UserContext.Provider>
          </SessionContext.Provider>
        </NotificationsProvider>
      </MantineProvider>
    </>
  );
}
