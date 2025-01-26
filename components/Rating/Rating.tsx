import { Rating as BaseComponent, useMantineTheme } from "@mantine/core";
import {
  IconMoodEmpty,
  IconMoodWrrr,
  IconMoodSad,
  IconMoodNeutral,
  IconMoodHappy,
  IconMoodCrazyHappy,
} from "@tabler/icons";
import { useContext, useState } from "react";
import { SessionContext } from "../../pages/_app";

function Rating() {
  const [value, setValue] = useState(0);
  const [, setSession] = useContext(SessionContext);

  const getEmptyIcon = (value: number = 1) => {
    const defaultProps = {
      size: 64,
      color: "gray",
    };
    switch (value) {
      case 1:
        return <IconMoodWrrr {...defaultProps} />;
      case 2:
        return <IconMoodSad {...defaultProps} />;
      case 3:
        return <IconMoodNeutral {...defaultProps} />;
      case 4:
        return <IconMoodHappy {...defaultProps} />;
      case 5:
        return <IconMoodCrazyHappy {...defaultProps} />;
      default:
        return <IconMoodEmpty {...defaultProps} />;
    }
  };

  const theme = useMantineTheme();

  const getFullIcon = (value: number = 1) => {
    const defaultProps = {
      size: 64,
    };

    switch (value) {
      case 1:
        return <IconMoodWrrr {...defaultProps} color={theme.colors.red[7]} />;
      case 2:
        return <IconMoodSad {...defaultProps} color={theme.colors.orange[7]} />;
      case 3:
        return (
          <IconMoodNeutral {...defaultProps} color={theme.colors.yellow[7]} />
        );
      case 4:
        return <IconMoodHappy {...defaultProps} color={theme.colors.lime[7]} />;
      case 5:
        return (
          <IconMoodCrazyHappy {...defaultProps} color={theme.colors.green[7]} />
        );
      default:
        return <IconMoodEmpty {...defaultProps} />;
    }
  };

  const handleChange = (i: number) => {
    setSession((prev: []) => [
      ...prev,
      {
        type: "gameplay",
        subtype: "level",
        action: "rate level",
        context: {
          value: i,
        },
        time: Date.now(),
      },
    ]);
    setValue(i);
  };

  return (
    <BaseComponent
      emptySymbol={getEmptyIcon}
      fullSymbol={getFullIcon}
      highlightSelectedOnly
      sx={{
        margin: "1rem auto",
      }}
      value={value}
      onChange={handleChange}
    />
  );
}

export { Rating };
