import { defineCommand, runMain } from "citty";
import { description, version } from "../package.json";
import link from "./features/link";
import vsce from "./features/vsce";

const cmd = defineCommand({
  meta: {
    name: "zin",
    version,
    description,
  },
  subCommands: {
    link,
    vsce,
  },
});

export function run() {
  return runMain(cmd);
}
