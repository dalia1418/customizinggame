import { AppShell } from "@mantine/core";
import { useState, useEffect } from "react";
import { BackButton } from "../Button";
import { Clock } from "../Clock";
import { Header } from "../Header";
import { Moves } from "../Moves";
import { LeftSidebar } from "../Sidebar";
import { useRouter } from "next/router";
import { convertFromQuery, generateCoins } from "./helpers";
import { setCharAt } from "../Moves/helpers";
import { Instructions } from "../Instructions";
import { Gift } from "../Gift";
import { InventoryType } from "../../types";

type LevelType = {
  inventory: InventoryType;
};

const Level = ({ inventory }: LevelType) => {
  const { query } = useRouter();

  let initialState = query.state?.toString() || "00000000";
  const moves = [3, 5, 7];
  const timer = convertFromQuery(query.timer) || 120;
  const lives = convertFromQuery(query.lives) || 3;
  const score = convertFromQuery(query.score) || 10000;
  const level = convertFromQuery(query.level) || 0;
  const levels = convertFromQuery(query.levels) || 3;
  const prediction = query.prediction?.toString();

  const coins = generateCoins(timer, initialState, prediction);

  const [params, setParams] = useState({
    state: initialState,
    handAngle: 0,
    numCells: initialState.length,
    moves,
    score,
    timer,
    lives,
    level,
    levels,
    prevMove: 0,
    coins,
    startTime: Date.now(),
  });

  useEffect(() => {
    setParams(prev => ({
      ...prev,
      coins: generateCoins(timer, initialState, prediction)
    }));
  }, [timer, initialState, prediction]);

  const sidebarWidth = 180;

  const handleReset = () => {
    setParams((prev) => ({
      ...prev,
      state: initialState,
      handAngle: 0,
      score: Math.max(prev.score - 200, 0),
      prevMove: 0,
      coins: generateCoins(timer, initialState, prediction)
    }));
  };

  const handleUndo = () => {
    const { prevMove, handAngle, numCells, state } = params;
    if (!prevMove) return;
    const newAngle = handAngle + (360 / numCells) * -prevMove;
    const oldPosition = ((handAngle / 360) * numCells) % numCells;
    setParams((prev) => ({
      ...prev,
      handAngle: newAngle,
      score: prev.score - 50,
      prevMove: 0,
      state: setCharAt(
        state,
        oldPosition,
        state.charAt(oldPosition) === "0" ? "1" : "0"
      ),
    }));
  };

  return (
    <>
      <AppShell
        navbar={
          <LeftSidebar
            width={{ base: sidebarWidth }}
            height={500}
            handleReset={handleReset}
            handleUndo={handleUndo}
            inventory={inventory}
            config={[params, setParams]}
          />
        }
        header={<Header config={[params, setParams]} />}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginLeft: -sidebarWidth,
          }}
        >
          <Clock config={[params, setParams]} />
          <Moves config={[params, setParams]} inventory={inventory} />
          <BackButton label="Quit" confirmation config={[params, setParams]} />
          <Instructions icon />
          <Gift setParams={setParams} />
        </div>
      </AppShell>
    </>
  );
};

export { Level };
