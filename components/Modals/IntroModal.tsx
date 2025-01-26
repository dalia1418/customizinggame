import { Modal, Stepper, Text } from "@mantine/core";
import {
  IconDeviceGamepad2,
  IconUserCheck,
  IconClipboardList,
} from "@tabler/icons";

const IntroModal = ({
  onClose,
  opened,
  active = 0,
}: {
  onClose: () => void;
  opened: boolean;
  active?: number;
}) => {
  return (
    <Modal
      onClose={onClose}
      opened={opened}
      centered
      title={
        <Text size="lg" weight="700">
          Experiment Process
        </Text>
      }
      overlayColor="#E9ECEF"
      overlayOpacity={0.85}
      overlayBlur={3}
    >
      <Stepper active={active} orientation="vertical">
        <Stepper.Step
          label={active == 0 ? "You are here!" : "Step 1"}
          description="Create an account"
          icon={<IconUserCheck size={18} />}
        />
        <Stepper.Step
          label={active == 1 ? "You are here!" : "Step 2"}
          description="Play the game"
          icon={<IconDeviceGamepad2 size={18} />}
        />
        <Stepper.Step
          label={active == 2 ? "You are here!" : "Step 3"}
          description="Complete a short personality assessment"
          icon={<IconClipboardList size={18} />}
        />
      </Stepper>
      <Text
        size="sm"
        mt={15}
        style={{ border: "1px solid black", padding: 10, borderRadius: 7 }}
      >
        After playing, press the{" "}
        <span style={{ fontWeight: 700 }}>Go to Personality Test</span> button in the main menu to
        start the personality assessment.
      </Text>
    </Modal>
  );
};

export { IntroModal };
