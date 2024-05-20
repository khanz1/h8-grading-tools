#!/usr/bin/env node

import { execSync } from "child_process";
import inquirer, { Answers, QuestionCollection } from "inquirer";
import fs from "fs";
import {
  Phase,
  SetCollection,
  Assignment,
  Phase2Answers,
  CloneRepository,
} from "./index.types";

function cloneRepositories({
  batchName,
  students,
  assignment,
}: CloneRepository) {
  students.forEach((ghUsername) => {
    console.log(`Cloning ${ghUsername}`);
    execSync(
      `git clone https://github.com/${batchName}/${assignment}-${ghUsername}`,
      { stdio: "inherit" }
    );
  });
}

const phaseQuestions: QuestionCollection<Answers> = {
  type: "list",
  name: "phaseName",
  message: "Enter Phase name:",
  choices: [Phase.P0, Phase.P1, Phase.P2, Phase.P3],
};

const phase2Questions: QuestionCollection<Phase2Answers> = [
  {
    type: "list",
    name: "collectionOfSet",
    message: "Enter Set Collection:",
    choices: [SetCollection.P2S5, SetCollection.P2S6],
  },
  {
    type: "checkbox",
    name: "assignment",
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

async function main() {
  const answers = await inquirer.prompt<Answers>(phaseQuestions);

  if (answers.phaseName === Phase.P2) {
    const phase2Answer = await inquirer.prompt(phase2Questions);
    const { collectionOfSet, assignment, includeRepeat } = phase2Answer;

    const studentsPath = "students.txt";

    if (!fs.existsSync(studentsPath)) {
      console.error("students.txt not found.");
      return;
    }

    const usernameList = fs
      .readFileSync(studentsPath, "utf-8")
      .trim()
      .split("\n");
    cloneRepositories({
      batchName: collectionOfSet,
      students: usernameList,
      assignment: assignment[0],
    });
    if (includeRepeat) {
      cloneRepositories({
        batchName: collectionOfSet,
        students: usernameList,
        assignment: `${assignment[0]}-repeat`,
      });
    }
  }
}

main();
