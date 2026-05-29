import { build } from "esbuild";
import { mkdir, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const outdir = resolve("standalone");

await mkdir(outdir, { recursive: true });

await build({
  entryPoints: ["src/main.tsx"],
  bundle: true,
  format: "iife",
  target: "es2020",
  outfile: resolve(outdir, "app.js"),
  loader: {
    ".css": "css",
    ".gif": "dataurl",
    ".jpg": "dataurl",
    ".png": "dataurl",
    ".mp4": "file",
    ".mov": "file",
    ".svg": "dataurl",
    ".ts": "ts",
    ".tsx": "tsx",
    ".webm": "file",
  },
  define: {
    "import.meta.env.BASE_URL": '"../assets/"',
  },
  jsx: "automatic",
  minify: true,
  sourcemap: false,
});

await writeFile(
  resolve(outdir, "index.html"),
  `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta
      name="description"
      content="Seoul Industry precision automotive OEM parts manufacturing."
    />
    <link
      rel="icon"
      href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' rx='7' fill='%23e9631a'/%3E%3Cpath d='M9 23 15 8M15 23 21 8M21 23 25 13' stroke='white' stroke-width='3.5' stroke-linecap='round'/%3E%3C/svg%3E"
    />
    <link rel="stylesheet" href="./app.css" />
    <title>Seoul Industry</title>
  </head>
  <body>
    <div id="root"></div>
    <script src="./app.js"></script>
  </body>
</html>
`,
  "utf8",
);
