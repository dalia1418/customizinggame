import { useMantineTheme } from "@mantine/core";
import styles from "../../styles/Floating.module.css";

const Floating = () => {
  const theme = useMantineTheme();
  const backgroundColor = theme.colors[theme.primaryColor][3];

  return (
    <div className={styles.area}>
      <ul className={styles.circles}>
        <li style={{ backgroundColor }}></li>
        <li style={{ backgroundColor }}></li>
        <li style={{ backgroundColor }}></li>
        <li style={{ backgroundColor }}></li>
        <li style={{ backgroundColor }}></li>
        <li style={{ backgroundColor }}></li>
        <li style={{ backgroundColor }}></li>
        <li style={{ backgroundColor }}></li>
        <li style={{ backgroundColor }}></li>
        <li style={{ backgroundColor }}></li>
      </ul>
    </div>
  );
};
export { Floating };
