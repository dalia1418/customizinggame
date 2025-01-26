import { useState } from "react";
import { createStyles, Box, Text, Group } from "@mantine/core";
import { IconListSearch } from "@tabler/icons";
import { useRouter } from "next/router";

const LINK_HEIGHT = 55;
const INDICATOR_SIZE = 10;
const INDICATOR_OFFSET = (LINK_HEIGHT - INDICATOR_SIZE) / 2;

const useStyles = createStyles((theme) => ({
  link: {
    ...theme.fn.focusStyles(),
    display: "flex",
    alignItems: "center",
    textDecoration: "none",
    color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,
    cursor: "pointer",
    lineHeight: 1.5,
    fontSize: theme.fontSizes.sm,
    height: LINK_HEIGHT,
    borderTopRightRadius: theme.radius.sm,
    borderBottomRightRadius: theme.radius.sm,
    borderLeft: `2px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[2]
    }`,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
      fontWeight: 500,
      borderLeftColor: theme.colors[theme.primaryColor][7],
      color: theme.colors[theme.primaryColor][7],

      "&, &:hover": {
        backgroundColor:
          theme.colorScheme === "dark"
            ? theme.fn.rgba(theme.colors[theme.primaryColor][9], 0.25)
            : theme.colors[theme.primaryColor][0],
      },
    },
  },

  linkActive: {
    fontWeight: 500,
    borderLeftColor: theme.colors[theme.primaryColor][7],
    color: theme.colors[theme.primaryColor][7],

    "&, &:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.fn.rgba(theme.colors[theme.primaryColor][9], 0.25)
          : theme.colors[theme.primaryColor][0],
    },
  },

  links: {
    position: "relative",
  },

  indicator: {
    transition: "transform 150ms ease",
    border: `2px solid ${
      theme.colors[theme.primaryColor][theme.colorScheme === "dark" ? 3 : 7]
    }`,
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
    height: INDICATOR_SIZE,
    width: INDICATOR_SIZE,
    borderRadius: INDICATOR_SIZE,
    position: "absolute",
    left: -INDICATOR_SIZE / 2 + 1,
  },
}));

type TableOfContentsProps = {
  label: string;
  link: string;
  order: number;
}[];

const links: TableOfContentsProps = [
  {
    label: "Personality Profiling",
    link: "/#personality",
    order: 1,
  },
  {
    label: "Problem with Common Profiling Techniques",
    link: "/#problem",
    order: 1,
  },
  {
    label: "Games as a Medium for Personality Assessment",
    link: "/#games",
    order: 1,
  },
  {
    label: "Personality Models",
    link: "/#models",
    order: 1,
  },
  {
    label: "The Five-Factor Model",
    link: "/#ffm",
    order: 1,
  },
];

function TableOfContents() {
  const { classes, cx } = useStyles();
  // const [active, setActive] = useState(0);
  const router = useRouter();

  const items = links.map((item, index) => (
    <Box<"a">
      component="a"
      onClick={(event) => {
        router.push(`/about${item.link}`);
        // setActive(index);
      }}
      key={item.label}
      // className={cx(classes.link, { [classes.linkActive]: active === index })}
      className={cx(classes.link)}
      sx={(theme) => ({ paddingLeft: item.order * theme.spacing.lg })}
    >
      {item.label}
    </Box>
  ));

  return (
    <div>
      <Group mb="md">
        <IconListSearch size={18} stroke={1.5} />
        <Text>Table of contents</Text>
      </Group>
      <div className={classes.links}>
        {/* <div
          className={classes.indicator}
          style={{
            transform: `translateY(${LINK_HEIGHT + INDICATOR_OFFSET}px)`,
          }}
        /> */}
        {items}
      </div>
    </div>
  );
}

export { TableOfContents };
