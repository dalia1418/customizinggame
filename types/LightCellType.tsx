type LightCellType = {
    style: {}
    toggled: boolean
    coin: {
        showCoin: boolean;
        timeToShow: number;
        showPowerup: string;
        timeUntilPowerup: number;
      };
}

type LightCellStyleType = {
    size: string
    toggled: boolean
}

export type {LightCellType, LightCellStyleType}