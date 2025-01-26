import { useContext, useState } from "react";
import { Modal, Button, TextInput, Text, createStyles } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useMediaQuery } from "@mantine/hooks";
import { showNotification } from "@mantine/notifications";
import { IconTrophy } from "@tabler/icons";
import { addToLeaderboard } from "../../utils/Database";
import { SessionContext } from "../../pages/_app";

const useStyles = createStyles((theme) => ({
  control: {
    transition: "all 350ms",
  },

  input: {
    marginTop: 16,
  },
}));

function LeaderboardModal({ score }: { score: any }) {
  const { classes, cx } = useStyles();
  const [opened, setOpened] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [, setSession] = useContext(SessionContext);

  const largeScreen = useMediaQuery("(min-width: 1400px)");

  const form = useForm({
    initialValues: {
      name: "",
      score,
    },
  });

  const handleSubmit = (values: { name: string; score: number }) => {
    setSession((prev: []) => [
      ...prev,
      {
        type: "gameplay",
        subtype: "leaderboard",
        action: "upload score",
        context: {
          score,
        },
        time: Date.now(),
      },
    ]);
    addToLeaderboard(values);
    setSubmitted(true);
    setOpened(false);
    showNotification({
      id: "hello-there",
      autoClose: 5000,
      title: "Success",
      message: "Your score has been added to the leaderboard successfully!",
      color: "green",
    });
  };

  return (
    <>
      <Modal
        centered
        opened={opened}
        onClose={() => setOpened(false)}
        title="Submit Score"
        transition="rotate-left"
        transitionDuration={400}
        transitionTimingFunction="ease"
        closeButtonLabel="Close leaderboard modal"
        zIndex={9999}
        overlayColor="#E9ECEF"
        overlayOpacity={0.85}
        overlayBlur={3}
      >
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Text size="lg" weight="700">
            Your Score: {score}
          </Text>
          <TextInput
            required
            label="Pick a Nickname"
            placeholder="John Doe"
            value={form.values.name}
            onChange={(event) =>
              form.setFieldValue("name", event.currentTarget.value)
            }
            className={classes.input}
          />
          <Button
            className={cx(classes.control, classes.input)}
            type="submit"
            size="md"
            radius="xl"
            mt="xl"
            variant="filled"
          >
            Submit
          </Button>
        </form>
      </Modal>

      <Button
        className={classes.control}
        size={largeScreen ? "xl" : "md"}
        radius="xl"
        variant="filled"
        onClick={() => setOpened(true)}
        rightIcon={<IconTrophy size={32} />}
        disabled={submitted}
      >
        Submit Score
      </Button>
    </>
  );
}

export { LeaderboardModal };
