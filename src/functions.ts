import { execSync } from "child_process";
import { CloneRepository } from "./types";

export const cloneRepository = ({ organization, name }: CloneRepository) => {
  try {
    execSync(`git clone https://github.com/${organization}/${name}`, {
      stdio: "inherit",
    });
  } catch (err) {
    if (err instanceof Error) {
      console.error(`${err.name} - ${err.message}`);
    }
  }
};
