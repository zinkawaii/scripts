import { defineCommand, runMain } from "citty";
import { description, version } from "../package.json";
import readme from "./features/readme";

const cmd = defineCommand({
    meta: {
        name: "zin",
        version,
        description
    },
    subCommands: {
        readme
    }
});

export function run() {
    return runMain(cmd);
}