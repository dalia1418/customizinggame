import { useState } from "react";
import {
  createStyles,
  Table,
  ScrollArea,
  Container,
  Title,
  LoadingOverlay,
} from "@mantine/core";
import { LeaderboardType } from "../../types";
import { BackButton } from "../Button";

const useStyles = createStyles((theme) => ({
  wrapper: {
    marginTop: 40,
    position: "relative",
  },

  title: {
    textAlign: "center",
    fontWeight: 800,
    fontSize: 52,
    letterSpacing: -1,
    color: theme.colors[theme.primaryColor][6],
    marginBottom: theme.spacing.xl,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,

    "@media (max-width: 520px)": {
      fontSize: 32,
      textAlign: "left",
    },
  },

  header: {
    position: "sticky",
    top: 0,
    transition: "box-shadow 150ms ease",
    backgroundColor: theme.white,
    "&::after": {
      content: '""',
      position: "absolute",
      left: 0,
      right: 0,
      bottom: 0,
      borderBottom: `1px solid ${theme.colors.gray[2]}`,
    },
  },

  scrolled: {
    boxShadow: theme.shadows.sm,
  },

  scrollarea: {
    height: "60vh",
  },
}));

function LeaderboardTable({ data }: LeaderboardType) {
  const { classes, cx } = useStyles();
  const [scrolled, setScrolled] = useState(false);

  data?.sort((a, b) => {
    return b.score - a.score;
  });

  const rows = data?.map((row, i) => (
    <tr key={row.name}>
      <td>{i + 1}</td>
      <td>{row.name}</td>
      <td>{row.score}</td>
    </tr>
  ));

  return (
    <>
      <Container className={classes.wrapper}>
        <Title className={classes.title}>Leaderboard</Title>
        <LoadingOverlay visible={data.length === 0} overlayBlur={2} />
        <ScrollArea
          className={classes.scrollarea}
          onScrollPositionChange={({ y }) => setScrolled(y !== 0)}
        >
          <Table
            sx={{ width: "70%", maxWidth: "50rem", margin: "0 auto" }}
            fontSize="md"
            verticalSpacing="xs"
            highlightOnHover
          >
            <thead
              className={cx(classes.header, { [classes.scrolled]: scrolled })}
            >
              <tr>
                <th>Position</th>
                <th>Name</th>
                <th>Score</th>
              </tr>
            </thead>
            <tbody>{rows}</tbody>
          </Table>
        </ScrollArea>
      </Container>
      <BackButton top />
    </>
  );
}

export { LeaderboardTable };
