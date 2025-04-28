import { linkSync } from "node:fs";
import { join } from "node:path";
import { defineCommand } from "citty";

export default defineCommand({
    meta: {
        name: "readme",
        description: "A set of readme utils"
    },
    args: {
        sync: {
            type: "string",
            description: "Sync `README.md` from root directory to the entry package"
        }
    },
    setup(context) {
        if (context.args.sync !== void 0) {
            sync(process.cwd(), context.args.sync);
        }
    }
});

export function sync(root: string, name: string) {
    const sourcePath = join(root, "README.md");
    const targetPath = join(root, "packages", name, "README.md");

    try {
        linkSync(sourcePath, targetPath);
    }
    catch {}
}