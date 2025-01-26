import { TablerIcon } from "@tabler/icons";
import { ConfigType, parameters } from "./ConfigType";
import { InventoryType } from "./InventoryType";

type SidebarOptionType = {
  icon: TablerIcon;
  label: string;
  onClick?(): void | undefined;
  disabled: boolean;
};

type SidebarType = {
  width: {};
  height: number;
  handleReset: () => void;
  handleUndo: () => void;
  config: ConfigType;
  inventory: InventoryType;
};

export type { SidebarOptionType, SidebarType };
