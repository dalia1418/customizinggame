import { IconClock, IconCoin, IconHeart } from "@tabler/icons";

const getPowerup = (powerup: string) => {
  switch (powerup) {
    case "time":
      return <IconClock size={24} color="black" />;
    case "heart":
      return <IconHeart size={24} color="black" />;
    default:
      break;
  }
};

export { getPowerup };
