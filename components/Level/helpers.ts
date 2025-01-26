const convertFromQuery = (el: string | string[] | undefined) => {
  return el && parseInt(el.toString());
};

const generatePowerup = () => {
  const powerups = ["time", "heart"];
  return powerups[Math.floor(Math.random() * powerups.length)];
};

const generateCoins = (timer: number, initialState: string, prediction?: string) => {
  // If prediction is '0' or '1', return an empty array
  if (prediction === '0' || prediction === '1') {
    return Array(initialState.length).fill({ showCoin: false, timeToShow: 0, showPowerup: "", timeUntilPowerup: 0 });
  }

  const coins = [];
  for (let i = 0; i < initialState.length; i++) {
    const showCoin = Math.random() < 0.5 ? true : false;
    const showPowerup =
      Math.random() < 0.5 && !showCoin ? generatePowerup() : "";
    const timeToShow = Math.random() * 60 * 1000;
    const timeUntilPowerup = timeToShow * 1.5;
    coins.push({ showCoin, timeToShow, showPowerup, timeUntilPowerup });
  }
  return coins;
};

export { convertFromQuery, generateCoins };
