import { useToggle, upperFirst } from "@mantine/hooks";
import {
  Paper,
  createStyles,
  TextInput,
  PasswordInput,
  Checkbox,
  Button,
  Title,
  Text,
  Anchor,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import {
  signInWithCredentials,
  signUpWithCredentials,
} from "../../utils/Firebase";
import { useContext, useState } from "react";
import { UserContext } from "../../pages/_app";
import { useRouter } from "next/router";
import Link from "next/link";
import { Swatch } from "../Swatch/Swatch";
import { IntroModal } from "../Modals";

const useStyles = createStyles((theme) => ({
  wrapper: {
    minHeight: "100vh",
    backgroundSize: "cover",
    backgroundImage:
      "url(https://images.unsplash.com/photo-1616447851323-b05941acdeb2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1870&q=80)",
  },

  form: {
    borderRight: `1px solid ${theme.colors.gray[3]}`,
    minHeight: "100vh",
    minWidth: "45vw",
    paddingTop: 80,
    float: "right",
    [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
      maxWidth: "100%",
    },
    position: "relative",
  },

  input: {
    maxWidth: "22rem",
    margin: "0 auto",
  },

  submit: {
    maxWidth: "10rem",
    margin: "0 auto",
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    color: theme.colors[theme.primaryColor][6],
    fontSize: 36,
    "@media (max-width: 1400px)": {
      fontSize: 28,
    },
  },

  subtitle: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontSize: 16,
    span: {
      textDecoration: "underline",
    },
  },

  center: {
    margin: "auto",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
}));

const Login = () => {
  const [opened, setOpened] = useState(true);
  const { classes } = useStyles();
  const router = useRouter();
  let { setUser, user } = useContext(UserContext);
  const [loading, setLoading] = useState(false);

  if (user) router.push("/");

  const [type, toggle] = useToggle(["register", "login"]);

  const form = useForm({
    initialValues: {
      email: "",
      password: "",
      terms: false,
    },

    validate: {
      email: (val) =>
        /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(val)
          ? null
          : "Invalid email format",
      password: (val) =>
        val.length > 6 ? null : "Password should include at least 6 characters",
    },
  });

  const handleSubmit = (values: { email: string; password: string }) => {
    setLoading(true);
    const callback = (result: any) => {
      setUser(result.user);
    };
    const catchCallback = () => {
      setLoading(false);
    };
    if (type === "register") {
      signUpWithCredentials(values, callback, catchCallback);
    } else {
      signInWithCredentials(values, callback, catchCallback);
    }
  };

  return (
    <div className={classes.wrapper}>
      <IntroModal opened={opened} onClose={() => setOpened(false)} />
      <Paper className={classes.form} radius={0} p={30}>
        <div className={classes.center}>
          <Title className={classes.title} align="center">
            Welcome {type == "login" && "back"} to Lamplighter!
          </Title>
          <Title className={classes.subtitle} align="center" mt="md" mb={10}>
            New to the project? Learn more about it{" "}
            <span>
              <Link href="/about">here</Link>
            </span>
          </Title>

          <form onSubmit={form.onSubmit(handleSubmit)}>
            <TextInput
              required
              label="Email"
              placeholder="hello@example.com"
              value={form.values.email}
              onChange={(event) =>
                form.setFieldValue("email", event.currentTarget.value)
              }
              error={form.errors.email && "Invalid email format"}
              className={classes.input}
            />
            <PasswordInput
              required
              label="Password"
              placeholder="Your password"
              value={form.values.password}
              onChange={(event) =>
                form.setFieldValue("password", event.currentTarget.value)
              }
              error={
                form.errors.password &&
                "Password should include at least 6 characters"
              }
              className={classes.input}
              mt="md"
            />
            {type === "register" && (
              <Checkbox
                required
                label="I consent for my data to be used for research purposes."
                checked={form.values.terms}
                onChange={(event) =>
                  form.setFieldValue("terms", event.currentTarget.checked)
                }
                mt="xl"
                className={classes.input}
              />
            )}
            <Button
              fullWidth
              mt="xl"
              size="md"
              type="submit"
              className={classes.submit}
              loading={loading}
            >
              {upperFirst(type)}
            </Button>

            <Text align="center" mt="md">
              {type === "register"
                ? "Already have an account? "
                : "Don't have an account? "}
              <Anchor<"a"> onClick={() => toggle()} weight="700">
                {type === "register" ? "Login" : "Register"}
              </Anchor>
            </Text>
          </form>
          <Swatch size={18} />
        </div>
      </Paper>
    </div>
  );
};

export { Login };
