import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import GithubSlugger from "github-slugger";

export interface BuildLogPayload {
  title: string;
  problem: string;
  solutionSteps: string[];
  links?: string[];
  keywords?: string[];
  date?: Date;
  extraMarkdown?: string;
}

const slugger = new GithubSlugger();

function toIsoDate(date: Date) {
  return date.toISOString().slice(0, 10);
}

function escapeQuote(text: string) {
  return text.replaceAll('"', '\\"');
}

export async function appendBuildLog(payload: BuildLogPayload) {
  const date = payload.date ?? new Date();
  const isoDate = toIsoDate(date);
  const slug = slugger.slug(payload.title);
  const fileName = `${isoDate}-${slug}.md`;
  const targetDir = path.join(process.cwd(), "src/content/build-logs");
  const targetFile = path.join(targetDir, fileName);

  const problemBlock = payload.problem
    .split("\n")
    .map((line) => `  ${line}`)
    .join("\n");

  const solutionLines = payload.solutionSteps.length
    ? payload.solutionSteps.map((item) => `  - "${escapeQuote(item)}"`).join("\n")
    : '  - "记录问题并完成修复"';

  const linksBlock = payload.links?.length ? `links:\n${payload.links.map((item) => `  - ${item}`).join("\n")}\n` : "";
  const keywordsBlock = payload.keywords?.length
    ? `keywords:\n${payload.keywords.map((item) => `  - "${escapeQuote(item)}"`).join("\n")}\n`
    : "keywords: []\n";

  const markdownSteps = payload.solutionSteps.length
    ? payload.solutionSteps.map((item, idx) => `${idx + 1}. ${item}`).join("\n")
    : "1. 记录问题并确认已解决。";

  const content = `---
title: "${escapeQuote(payload.title)}"
date: ${isoDate}
problem: |
${problemBlock}
solution:
${solutionLines}
${linksBlock}${keywordsBlock}---

## 背景

${payload.problem}

## 解决步骤

${markdownSteps}
${payload.extraMarkdown ? `\n\n${payload.extraMarkdown.trim()}\n` : ""}
`;

  await mkdir(targetDir, { recursive: true });
  await writeFile(targetFile, content, "utf8");
  return targetFile;
}
