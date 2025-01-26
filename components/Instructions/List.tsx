import { Title, List as BaseComponent, createStyles } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  control: {
    transition: "all 350ms",
    "&:not(:first-of-type)": {
      marginLeft: theme.spacing.md,
    },

    "@media (max-width: 520px)": {
      height: 42,
      fontSize: theme.fontSizes.md,

      "&:not(:first-of-type)": {
        marginTop: theme.spacing.md,
        marginLeft: 0,
      },
    },

    "&:hover": {
      backgroundColor: theme.primaryColor[1],
    },
  },

  icon: {
    zIndex: 10,
    position: "absolute",
    right: 15,
    bottom: 20,
  },

  list: {
    marginBottom: 16,
    paddingInline: 8,
    maxWidth: "45ch",
    marginInline: "auto",
  },
}));

const List = ({ data }: { data: { title: string; points: string[] }[] }) => {
  const { classes } = useStyles();

  const Bullets = (listItems: string[]) => {
    const bullets = listItems.map((bullet) => (
      <BaseComponent.Item key={bullet}>{bullet}</BaseComponent.Item>
    ));

    return <>{bullets}</>;
  };

  const rules = data.map((system) => {
    return (
      <>
        <Title size={24} weight="700" mb={10} align="center">
          {system.title}
        </Title>
        <BaseComponent
          size="md"
          className={classes.list}
          listStyleType="circle"
        >
          {Bullets(system.points)}
        </BaseComponent>
      </>
    );
  });

  return <>{rules}</>;
};

export { List };
