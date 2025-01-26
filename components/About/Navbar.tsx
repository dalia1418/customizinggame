import { createStyles, Navbar, Group, Box, Text } from "@mantine/core";
import { IconSwitchHorizontal } from "@tabler/icons";
import { TableOfContents } from "./TableOfContents";
import { useRouter } from "next/router";

const useStyles = createStyles((theme, _params, getRef) => {
  const icon = getRef("icon");
  return {
    header: {
      paddingBottom: theme.spacing.md,
      marginBottom: theme.spacing.md * 1.5,
      borderBottom: `1px solid ${
        theme.colorScheme === "dark"
          ? theme.colors.dark[4]
          : theme.colors.gray[2]
      }`,
    },

    footer: {
      borderTop: `1px solid ${
        theme.colorScheme === "dark"
          ? theme.colors.dark[4]
          : theme.colors.gray[3]
      }`,
      paddingTop: theme.spacing.md,
    },

    link: {
      ...theme.fn.focusStyles(),
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      textDecoration: "none",
      fontSize: theme.fontSizes.sm,
          color: theme.colorScheme === "dark" ? theme.white : theme.black,
      padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
      borderRadius: theme.radius.sm,
      fontWeight: 500,

      "&:hover": {
        backgroundColor:
theme.colors.gray[2],

        [`& .${icon}`]: {
          color: theme.colorScheme === "dark" ? theme.white : theme.black,
        },
      },
    },

    linkIcon: {
      ref: icon,
      color:
        theme.colorScheme === "dark"
          ? theme.colors.dark[2]
          : theme.colors.gray[6],
      marginRight: theme.spacing.sm,
    },
  };
});

function AboutNavbar(props: any) {
  const { classes } = useStyles();
  const router = useRouter();

  return (
    <Navbar {...props}>
      <Navbar.Section grow>
        <Group className={classes.header} position="apart">
          <Text sx={{ fontWeight: 700 }}>About Lamplighter</Text>
        </Group>
        <TableOfContents />
      </Navbar.Section>

      <Navbar.Section className={classes.footer}>
        <Box onClick={() => router.push("/login")} className={classes.link}>
          <IconSwitchHorizontal className={classes.linkIcon} stroke={1.5} />
          <span>Back to login</span>
        </Box>
      </Navbar.Section>
    </Navbar>
  );
}

export { AboutNavbar };
