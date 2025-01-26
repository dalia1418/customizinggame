import { useMediaQuery } from "@mantine/hooks";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { LeaderboardTable, SmallScreen, Waves } from "../components";
import { getAllLeaderboard } from "../utils/Firebase";

const Leaderboard: NextPage = () => {
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const users = await getAllLeaderboard();
      setUsers(users);
    };
    fetchUsers();
  }, []);

  const small = useMediaQuery("(max-width: 1024px)");

  if (small) return <SmallScreen />;

  return (
    <>
      <LeaderboardTable data={users} />
      <Waves />
    </>
  );
};

export default Leaderboard;
