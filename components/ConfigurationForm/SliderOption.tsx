import { createStyles, SegmentedControl, useMantineTheme } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  root: {
    backgroundColor: theme.white,
    boxShadow: theme.shadows.md,
    border: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[1]
    }`,
  },

  control: {
    border: "0 !important",
  },

  labelActive: {
    color: `${theme.white} !important`,
  },
}));

function SliderOption(props: any) {
  const { classes } = useStyles();
  const theme = useMantineTheme();
  return (
    <SegmentedControl
      radius="xl"
      size="sm"
      data={props.data}
      classNames={classes}
      color={theme.primaryColor}
      {...props}
    />
  );
}

export { SliderOption };
