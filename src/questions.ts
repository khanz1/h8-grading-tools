import { Answers, QuestionCollection } from "inquirer";
import { Phase, SetCollection, Assignment, Phase2Answers } from "./types";

export const phaseQuestions: QuestionCollection<Answers> = {
  type: "list",
  name: "phaseName",
  message: "Enter Phase name:",
  choices: [Phase.P0, Phase.P1, Phase.P2, Phase.P3],
};

export const phase2Questions: QuestionCollection<Phase2Answers> = [
  {
    type: "list",
    name: "collectionOfSet",
    message: "Enter Set Collection:",
    choices: [SetCollection.P2S5, SetCollection.P2S6],
  },
  {
    type: "checkbox",
    name: "assignments",
    message: "Enter Assignment:",
    validate: (input) => {
      if (Array.isArray(input) && !input.length)
        return "Please select Assignment";
      return true;
    },
    choices: [
      {
        name: Assignment.GC01,
      },
      {
        name: Assignment.GC02,
      },
      {
        name: Assignment.LC01,
      },
      {
        name: Assignment.LC02,
      },
      {
        name: Assignment.LC03,
      },
      {
        name: Assignment.IP,
      },
      {
        name: Assignment.GP,
      },
    ],
  },
  {
    type: "confirm",
    name: "includeRepeat",
    message: "Is Include Repeat Student?",
  },
];
