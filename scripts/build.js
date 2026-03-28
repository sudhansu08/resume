import { readdir, readFile, mkdir, writeFile } from "node:fs/promises";
import { join, basename } from "node:path";
import { render } from "resumed";
import theme from "jsonresume-theme-elegant";

const RESUMES_DIR = "resumes";
const OUTPUT_DIR = "dist";
const PRIMARY_RESUME = "sudhansu.json";

const validateOnly = process.argv.includes("--validate-only");

const files = (await readdir(RESUMES_DIR)).filter((f) => f.endsWith(".json"));

if (files.length === 0) {
  console.error("No resume JSON files found in resumes/");
  process.exit(1);
}

let hasErrors = false;

for (const file of files) {
  const filePath = join(RESUMES_DIR, file);
  const raw = await readFile(filePath, "utf-8");

  let resume;
  try {
    resume = JSON.parse(raw);
  } catch (err) {
    console.error(`Invalid JSON in ${filePath}: ${err.message}`);
    hasErrors = true;
    continue;
  }

  if (!resume.basics?.name) {
    console.error(`${filePath}: missing basics.name`);
    hasErrors = true;
    continue;
  }

  console.log(`✓ ${filePath} — ${resume.basics.name}`);

  if (validateOnly) continue;

  const html = await render(resume, theme);

  const name = basename(file, ".json");
  const outputDir =
    file === PRIMARY_RESUME ? OUTPUT_DIR : join(OUTPUT_DIR, name);

  await mkdir(outputDir, { recursive: true });
  await writeFile(join(outputDir, "index.html"), html);
  console.log(`  → ${join(outputDir, "index.html")}`);
}

if (hasErrors) {
  process.exit(1);
}
