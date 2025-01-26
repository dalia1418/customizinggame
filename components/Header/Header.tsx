import {
  createStyles,
  Header as BaseComponent,
  Container,
} from "@mantine/core";
import { ConfigType } from "../../types";
import { Lives } from "../Lives";
import { Score } from "../Score";
import { Timer } from "../Timer";
import { useRouter } from "next/router";

const HEADER_HEIGHT = 150;

const useStyles = createStyles((theme) => ({
  inner: {
    height: HEADER_HEIGHT,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBlock: theme.spacing.sm,
    marginInline: theme.spacing.xl * 2,
  },
}));

type HeaderType = {
  config: ConfigType;
};

function Header({ config }: HeaderType) {
  const router = useRouter();
  const { prediction } = router.query;
  const [params] = config;
  const { score } = params;

  const { classes } = useStyles();

  return (
    <BaseComponent height={HEADER_HEIGHT} sx={{ borderBottom: 0 }} mb={10}>
      <Container className={classes.inner} fluid>
        <Score score={score} />
        {prediction !== '1' && <Timer config={config} />}
        {prediction !== '1' && <Lives config={config} />}
      </Container>
    </BaseComponent>
  );
}

export { Header };
