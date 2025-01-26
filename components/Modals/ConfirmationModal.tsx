import { Button, Group, Modal, Text } from "@mantine/core";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { SessionContext, UserContext } from "../../pages/_app";
import { ConfigType } from "../../types";
import { addSession, hasFinishedAssessment } from "../../utils/Database";
import { logOut } from "../../utils/Firebase";

const ConfirmationModal = ({
  onClose,
  opened,
  config,
  query,
}: {
  onClose: () => void;
  opened: boolean;
  config?: ConfigType;
  query?: any;
}) => {
  const { user } = useContext(UserContext);
  const [session, setSession] = useContext(SessionContext);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  let values: any;

  if (config) {
    const [params] = config;
    values = params;
  } else if (query) {
    values = query;
  }

  const handleQuit = async () => {
    setLoading(true);
    setSession((prev: []) => [
      ...prev,
      {
        type: "gameplay",
        subtype: "level",
        action: "quit game",
        context: {
          score: values.score,
          state: values.state,
          lives: values.lives,
          timer: values.timer,
          level: values.level,
        },
        time: Date.now(),
      },
    ]);
    addSession(user.uid, JSON.stringify(session));
    setSession([]);
    const assessmentComplete = await hasFinishedAssessment(user.uid);
    if (assessmentComplete) {
      logOut();
      router.push("/");
    } else router.push("/assessment");
  };

  return (
    <Modal
      onClose={onClose}
      opened={opened}
      centered
      title={
        <Text size="lg" weight="700">
          Are you sure?
        </Text>
      }
      zIndex={9999}
      overlayColor="#E9ECEF"
      overlayOpacity={0.85}
      overlayBlur={3}
    >
      <Text color="dimmed" size="sm">
        Are you sure you want to return to the main menu? All your progress will
        be lost.
      </Text>
      <Group position="right" mt="md">
        <Button variant="default" size="sm" onClick={onClose}>
          Cancel
        </Button>
        <Button
          variant="outline"
          size="sm"
          color="red"
          onClick={handleQuit}
          loading={loading}
        >
          Quit
        </Button>
      </Group>
    </Modal>
  );
};

export { ConfirmationModal };
