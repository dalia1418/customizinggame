import {
  Button,
  Container,
  List,
  Radio,
  ScrollArea,
  Table,
  Text,
  Title,
  createStyles,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useMediaQuery } from "@mantine/hooks";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { SmallScreen } from "../components";
import { IntroModal } from "../components/Modals";
import { addScores } from "../utils/Database";
import { logOut } from "../utils/Firebase";
import { UserContext } from "./_app";

const useStyles = createStyles((theme) => ({
  wrapper: {
    marginTop: theme.spacing.xl,
  },

  questionsContainer: {
    marginInline: "auto",
    maxWidth: "75ch",
  },

  title: {
    textAlign: "center",
    marginBottom: theme.spacing.lg,
  },

  description: {
    maxWidth: "75ch",
    marginInline: "auto",
    marginBottom: theme.spacing.lg,
  },

  prompt: {
    textAlign: "center",
    marginBottom: theme.spacing.lg,
  },

  table: {
    maxWidth: "75ch",
    marginInline: "auto",
    marginBottom: theme.spacing.sm,
  },

  submitButton: {
    float: "right",
    marginTop: theme.spacing.xl,
  },

  labelDescription: {
    color: "black",
  },
}));

const Assessment: NextPage = () => {
  const [opened, setOpened] = useState(true);
  const { classes } = useStyles();
  const { user } = useContext(UserContext);
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const prompts: string[] = [
    "Is talkative",
    "Tends to find fault with others",
    "Does a thorough job",
    "Is depressed, blue",
    "Is original, comes up with new ideas",
    "Is reserved",
    "Is helpful and unselfish with others ",
    "Can be somewhat careless",
    "Is relaxed, handles stress well ",
    "Is curious about many different things",
    "Is full of energy",
    "Starts quarrels with others",
    "Is a reliable worker",
    "Can be tense",
    "Is ingenious, a deep thinker",
    "Generates a lot of enthusiasm",
    "Has a forgiving nature",
    "Tends to be disorganized",
    "Worries a lot",
    "Has an active imagination",
    "Tends to be quiet ",
    "Is generally trusting",
    "Tends to be lazy",
    "Is emotionally stable, not easily upset",
    "Is inventive",
    "Has an assertive personality",
    "Can be cold and aloof",
    "Perseveres until the task is finished",
    "Can be moody ",
    "Values artistic, aesthetic experiences",
    "Is sometimes shy, inhibited",
    "Is considerate and kind to almost everyone",
    "Does things efficiently",
    "Remains calm in tense situations ",
    "Prefers work that is routine",
    "Is outgoing, sociable",
    "Is sometimes rude to others",
    "Makes plans and follows through with them",
    "Gets nervous easily",
    "Likes to reflect, play with ideas",
    "Has few artistic interests",
    "Likes to cooperate with others",
    "Is easily distracted",
    "Is sophisticated in art, music, or literature",
  ];

  const translations: string[] = [
    "يتحدث كثيرا",
    "يبحث عن الأخطاء في الآخرين",
    "يقوم بعمل متقن",
    "مكتئب",
    "أصيل وقادر على الأتيان بأفكار جديدة",
    "متحفظ",
    "متعاون وغير أناني",
    "لا يكترث بما حوله الى حد ما",
    "متمهل ويدير الضغوط بشكل جيد",
    "لديه الفضول والرغبة في التعرف على عدة أشياء",
    "مفعم بالحيوية والنشاط",
    "يفتعل الشجار مع الآخرين",
    "يمكن الاعتماد عليه",
    "شديد التفاعل مع الآخرين",
    "ذكي ويفكر بعمق",
    "يولد الكثير من الحماس",
    "متسامح",
    "غير منظم",
    "يقلق كثيرا",
    "لديه خيال نشط",
    "هادئ",
    "يثق في الناس",
    "كسول",
    "متزن",
    "خلاق",
    "حازم",
    "سلبي وغير مبالي",
    "يثابر حتى انتهاء المهمة",
    "مزاجي",
    "يهوي الفن",
    "خجول ومنعزل",
    "متفهم وخلوق مع الناس",
    "ينفذ المهام بكفاءة",
    "هادئ في المواقف الصعبة",
    "يفضل الأعمال الروتينية",
    "اجتماعي",
    "غليظ الطبع مع الآخرين",
    "يضع الخطط ويلتزم بهم",
    "يصاب بالتوتر بسهولة",
    "يحب التفكر واعادة تركيب الأفكار",
    "لديه القليل من الاهتمام بالفن",
    "يحب التعاون مع الآخرين",
    "يصاب بالتشتت بسهولة",
    "مطلع على الفن والموسيقى والأدب",
  ];

  const defaultValues = prompts.reduce((a, v) => ({ ...a, [v]: "" }), {});

  const validation = prompts.reduce(
    (a, v) => ({
      ...a,
      [v]: (value: string) => (value != "" ? null : "Please choose a number"),
    }),
    {}
  );

  const form = useForm({
    initialValues: {
      ...defaultValues,
    },

    validate: {
      ...validation,
    },
  });

  const questions = prompts.map((question, i) => (
    <List.Item key={question}>
      <Radio.Group
        name={question}
        label={question}
        description={translations[i]}
        {...form.getInputProps(question)}
        classNames={{
          description: classes.labelDescription,
        }}
      >
        <Radio value="1" label="1" />
        <Radio value="2" label="2" />
        <Radio value="3" label="3" />
        <Radio value="4" label="4" />
        <Radio value="5" label="5" />
      </Radio.Group>
    </List.Item>
  ));

  const handleSubmit = async (scores: string[]) => {
    setLoading(true);
    await addScores(user.uid, JSON.stringify(scores)).then(() => {
      logOut();
      router.push("/");
    });
  };

  const small = useMediaQuery("(max-width: 1024px)");

  if (small) return <SmallScreen />;

  return (
    <Container className={classes.wrapper}>
      <IntroModal opened={opened} onClose={() => setOpened(false)} active={2} />
      <Title className={classes.title} size={28}>
        The Big Five Inventory (BFI)
      </Title>
      <Text className={classes.description} size="sm">
        Here are a number of characteristics that may or may not apply to you.
        Please choose a number under each statement to indicate the extent to
        which you agree or disagree with that statement.{" "}
      </Text>
      <Table className={classes.table} fontSize="xs">
        <thead>
          <tr>
            <th>Disagree strongly</th>
            <th>Disagree a little</th>
            <th>Neither agree nor disagree</th>
            <th>Agree a little</th>
            <th>Agree strongly</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>2</td>
            <td>3</td>
            <td>4</td>
            <td>5</td>
          </tr>
        </tbody>
      </Table>
      <Title size={18} className={classes.prompt}>
        I see Myself as Someone Who...
      </Title>
      <Container className={classes.questionsContainer}>
        <form
          onSubmit={form.onSubmit((values, _event) => {
            _event.preventDefault();
            handleSubmit(Object.values(values));
          })}
        >
          <ScrollArea style={{ height: "35vh" }}>
            <List type="ordered">{questions}</List>
          </ScrollArea>
          <Button
            type="submit"
            size="md"
            radius="xl"
            className={classes.submitButton}
            loading={loading}
          >
            Submit
          </Button>
        </form>
      </Container>
    </Container>
  );
};

export default Assessment;
