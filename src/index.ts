#!/usr/bin/env node

import inquirer, { Answers } from "inquirer";
import fs from "fs";
import { Phase } from "./types";
import { phase2Questions, phaseQuestions } from "./questions";
import { cloneRepository } from "./functions";

async function main() {
  const studentsPath = "./students.txt";

  if (!fs.existsSync(studentsPath)) {
    console.error("students.txt not found.");
    return;
  }

  const answers = await inquirer.prompt<Answers>(phaseQuestions);

  if (answers.phaseName === Phase.P2) {
    const phase2Answer = await inquirer.prompt(phase2Questions);
    const { collectionOfSet, assignments, includeRepeat } = phase2Answer;

    const usernameList = fs
      .readFileSync(studentsPath, "utf-8")
      .trim()
      .split("\n");

    for (const assignment of assignments) {
      // check if folder exist
      const dirName = `./${assignment}`;
      if (fs.existsSync(dirName)) {
        console.error(`Folder ./${assignment} already exist.`);
        // next is using inquirer
        return;
      }

      // create folder
      fs.mkdirSync(dirName, { recursive: true });
      // cd to folder
      process.chdir(dirName);

      for (const username of usernameList) {
        cloneRepository({
          organization: collectionOfSet,
          name: `${assignment}-${username}`,
        });

        const dirName = `./${collectionOfSet}/${assignment}-${username}`;
        if (fs.existsSync(dirName)) {
          console.error(`Folder ./${assignment} already exist.`);
          // next is using inquirer
          continue;
        }
        // check if clone is successful
        if (includeRepeat) {
          cloneRepository({
            organization: collectionOfSet,
            name: `${assignment}-repeat-${username}`,
          });
        }
      }
      // back to root folder
      process.chdir("..");
    }
  }
}

main();
