import { useMediaQuery } from "@mantine/hooks";
import { NextPage } from "next";
import { Login, SmallScreen } from "../components";

const LoginPage: NextPage = () => {
  const small = useMediaQuery("(max-width: 1024px)");

  if (small) return <SmallScreen />;
  return <Login />;
};

export default LoginPage;
