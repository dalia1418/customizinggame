import { Center, Container, Flex } from "@mantine/core";

const SmallScreen = () => {
  return (
    <Center
      style={{
        width: "80vw",
        height: "100vh",
        textAlign: "center",
        marginInline: "auto",
      }}
    >
      <h1>Game is only playable on laptop or desktop (min-width: 1024px)</h1>
    </Center>
  );
};

export { SmallScreen };
