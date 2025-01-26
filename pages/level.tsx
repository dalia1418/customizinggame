import { useMediaQuery } from "@mantine/hooks";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { Level, SmallScreen } from "../components";

const LevelScreen: NextPage = () => {
  const [contents, setContents] = useState<string[]>([]);

  useEffect(() => {
    const inventoryJSON = localStorage.getItem("inventory");
    setContents(inventoryJSON ? JSON.parse(inventoryJSON) : []);
  }, []);

  const small = useMediaQuery("(max-width: 1024px)");

  if (small) return <SmallScreen />;

  return <Level inventory={[contents, setContents]} />;
};

export default LevelScreen;
