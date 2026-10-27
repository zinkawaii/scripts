import { readFile } from "node:fs/promises";
import { basename, join } from "node:path";
import { defineCommand } from "citty";

export default defineCommand({
  meta: {
    name: "release",
    description: "Release a package in the monorepo",
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
    await release(context.args.kind);
  },
});

export async function release(kind: "folder" | "package.name") {
  const { versionBump } = await import("bumpp");

  const folder = basename(process.cwd());
  let tag: string;

  if (kind === "folder") {
    tag = folder;
  }
  else {
    const path = join(process.cwd(), "package.json");
    const packageJson = await readFile(path, "utf-8").then(JSON.parse);
    tag = packageJson.name;
  }

  await versionBump({
    push: false,
    tag: `${tag}@%s`,
    commit: `release(${folder}): v%s`,
  });
}
