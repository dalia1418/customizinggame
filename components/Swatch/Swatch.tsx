import { Group, ColorSwatch, useMantineTheme } from "@mantine/core";
import { useContext } from "react";
import { SessionContext, ThemeContext } from "../../pages/_app";

const Swatch = ({ size }: { size: number }) => {
  const theme = useMantineTheme();
  const setTheme = useContext(ThemeContext);
  const [, setSession] = useContext(SessionContext);

  const colorsArray = [
    "red",
    "pink",
    "orange",
    "green",
    "cyan",
    "blue",
    "indigo",
    "grape",
  ];

  const swatches = colorsArray.map((color, i) => (
    <ColorSwatch
      sx={{ cursor: "pointer" }}
      onClick={() => {
        setSession((prev: []) => [
          ...prev,
          {
            type: "configuration",
            subtype: "configure theme",
            action: "change color scheme",
            context: {
              color,
            },
            time: Date.now(),
          },
        ]);
        setTheme((prev) => ({ ...prev, primaryColor: color }));
      }}
      key={color}
      color={theme.colors[colorsArray[i]][6]}
      radius="xl"
      size={size}
    />
  ));

  return (
    <Group position="center" spacing="sm" m="xl">
      {swatches}
    </Group>
  );
};

export { Swatch };
