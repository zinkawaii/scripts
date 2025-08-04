import { readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { defineCommand } from "citty";
import { $ } from "zx";
import { logger } from "../utils/logger";

export default defineCommand({
    meta: {
        name: "vsce",
        description: "@vscode/vsce for pnpm catalog",
    },
    setup(context) {
        vsce(process.cwd(), ...context.args._);
    },
});

export async function vsce(root: string, ...args: string[]) {
    const dir = resolve(root, "package.json");
    const text = await readFile(dir, "utf-8");
    const json = JSON.parse(text);

    json.devDependencies["@types/vscode"] = json.engines.vscode;

    try {
        await writeFile(dir, JSON.stringify(json));
        await $`pnpm vsce ${args.join(" ")}`;
    }
    catch (error) {
        logger.error(error);
    }
    finally {
        await writeFile(dir, text);
    }
}
