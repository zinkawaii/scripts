import { existsSync, linkSync } from "node:fs";
import { join, relative } from "node:path";
import { defineCommand } from "citty";
import { logger } from "../utils/logger";

export default defineCommand({
    meta: {
        name: "link",
        description: "Link some files into packages"
    },
    setup(context) {
        link(process.cwd(), context.args._);
    }
});

export function link(root: string, packages: string[]) {
    for (const name of packages) {
        linkFile("README.md", name);
    }
    linkFile("LICENSE", "vscode", false);

    function linkFile(name: string, to: string, verbose = true) {
        const sourcePath = join(root, name);
        const targetDir = join(root, "packages", to);
        const targetPath = join(targetDir, name);

        if (!existsSync(sourcePath)) {
            verbose && logger.error(
                `file ${relate(sourcePath)} does not exist.`
            );
            return;
        }
        if (!existsSync(targetDir)) {
            verbose && logger.error(
                `folder ${relate(targetDir)} does not exist.`
            );
            return;
        }
        if (existsSync(targetPath)) {
            logger.info(
                `file ${relate(targetPath)} already exists.`
            );
            return;
        }
        try {
            linkSync(sourcePath, targetPath);
            logger.success(
                `linked ${relate(sourcePath)} to ${relate(targetPath)}.`
            );
        }
        catch {}
    }

    function relate(path: string) {
        return "`" + relative(root, path) + "`";
    }
}