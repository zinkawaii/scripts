import { defineCommand, runMain } from "citty";
import { description, version } from "../package.json";
import link from "./features/link";

const cmd = defineCommand({
    meta: {
        name: "zin",
        version,
        description
    },
    subCommands: {
        link
    }
});

export function run() {
    return runMain(cmd);
}