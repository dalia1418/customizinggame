import {
  Group,
  useMantineTheme,
  SegmentedControl as BaseComponent,
  Center,
  Box,
} from "@mantine/core";
import { IconSquare, IconCircle } from "@tabler/icons";

const SegmentedControl = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (args: any) => void;
}) => {
  const theme = useMantineTheme();

  return (
    <Group>
      <BaseComponent
        size="lg"
        color={theme.colors[theme.primaryColor][6]}
        radius="xl"
        mb={8}
        mx="auto"
        value={value}
        onChange={onChange}
        data={[
          {
            value: "50%",
            label: (
              <Center>
                <IconCircle size={16} />
                <Box ml={10}>Circle</Box>
              </Center>
            ),
          },
          {
            value: "20%",
            label: (
              <Center>
                <IconSquare size={16} />
                <Box ml={10}>Square</Box>
              </Center>
            ),
          },
        ]}
      />
    </Group>
  );
};

export { SegmentedControl };
