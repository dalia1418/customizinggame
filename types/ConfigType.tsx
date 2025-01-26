import { Dispatch, SetStateAction } from "react";

type parameters = {
  state: string;
  handAngle: number;
  numCells: number;
  moves: number[];
  score: number;
  timer: number;
  lives: number;
  level: number;
  levels: number;
  prevMove: number;
  coins: {
    showCoin: boolean;
    timeToShow: number;
    showPowerup: string;
    timeUntilPowerup: number;
  }[];
  startTime: number;
};

type ConfigType = [
  params: parameters,
  setParams: Dispatch<SetStateAction<parameters>>
];
export type { ConfigType, parameters };
