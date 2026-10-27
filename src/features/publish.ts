import { defineCommand } from "citty";
import { exec } from "tinyexec";
import { logger } from "../utils/logger";

export default defineCommand({
  meta: {
    name: "publish",
    description: "Publish a package in the monorepo",
  },
  args: {
    kind: {
      type: "enum",
      options: [
        "folder",
        "package.name",
      ],
      default: "folder",
      description: "How tags are mapped to package locations",
    },
  },
  async setup(context) {
    await publish(context.args.kind);
  },
});

export async function publish(kind?: "folder" | "package.name") {
  const tag = process.env.GITHUB_REF_NAME;
  if (tag === void 0) {
    logger.error("`process.env.GITHUB_REF_NAME` is missing.");
    process.exit(1);
  }

  const locateArgs = kind === "folder"
    // unknown@1.2.3 -> packages/unknown
    ? ["--dir", "packages/" + tag.split("@", 1)[0]]
    // @scope/unknown@1.2.3 -> { name: "@scope/unknown" }
    : ["--filter", "@" + tag.split("@", 2)[1]];

  await exec("pnpm", [...locateArgs, "publish", "--access", "public", "--no-git-checks"], {
    nodeOptions: {
      stdio: "inherit",
    },
    throwOnError: true,
  });
}
