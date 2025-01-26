import { Button, Group, Stack, Text } from "@mantine/core";
import { showNotification, cleanNotifications } from "@mantine/notifications";
import { IconGift, IconMoodHappy, IconMoodSad } from "@tabler/icons";
import { useContext, useEffect, useState } from "react";
import { SessionContext } from "../../pages/_app";
import { useTimer } from "../../utils";

const Gift = ({ setParams }: { setParams: (args: any) => void }) => {
  const [timer, setTimer] = useState(
    Date.now() + Math.random() * 60 * 1000 + 10 * 1000
  );
  const { minutes, seconds } = useTimer(timer);
  const [, setSession] = useContext(SessionContext);

  const handleReject = () => {
    cleanNotifications();

    setSession((prev: []) => [
      ...prev,
      {
        type: "gameplay",
        subtype: "gift",
        action: "reject gift",
        time: Date.now(),
      },
    ]);
  };

  const handleAccept = () => {
    cleanNotifications();
    const gift = Math.floor(Math.random() * 1000);
    const prank = gift < 500;

    setSession((prev: []) => [
      ...prev,
      {
        type: "gameplay",
        subtype: "gift",
        action: "accept gift",
        context: prank ? "prank" : "gift",
        time: Date.now(),
      },
    ]);

    if (prank) {
      showNotification({
        id: "hello-there",
        autoClose: 3000,
        message: `Uh oh, you got pranked! You lost ${gift} points!`,
        color: "red",
        icon: <IconMoodSad size={18} />,
      });
      setParams((prev: { score: number }) => {
        return {
          ...prev,
          score: prev.score - gift,
        };
      });
    } else {
      showNotification({
        id: "hello-there",
        autoClose: 3000,
        message: `You were gifted ${gift} points!`,
        color: "green",
        icon: <IconMoodHappy size={18} />,
      });
      setParams((prev: { score: number }) => {
        return {
          ...prev,
          score: prev.score + gift,
        };
      });
    }
  };

  useEffect(() => {
    if (minutes == 0 && seconds == 0) {
      showNotification({
        id: "hello-there",
        autoClose: 10000,
        title: "Another player has sent you a gift!",
        message: (
          <Stack align="flex-start">
            <Text size="sm" color="dimmed">
              Accept to open it or ignore to reject
            </Text>
            <Group>
              <Button size="sm" onClick={handleAccept}>
                Accept
              </Button>
              <Button size="sm" onClick={handleReject}>
                Reject
              </Button>
            </Group>
          </Stack>
        ),
        icon: <IconGift size={18} />,
      });
    }
  }, [seconds]);

  return null;
};

export { Gift };
