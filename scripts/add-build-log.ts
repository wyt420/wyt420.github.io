import readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import { appendBuildLog } from "./build-log-utils";

const rl = readline.createInterface({ input, output });

function escapeMultiline(text: string) {
  return text
    .split("\n")
    .map((line) => line.trimEnd())
    .join("\n");
}

async function askMultiline(prompt: string) {
  output.write(`${prompt}\n`);
  output.write("请输入多行内容，单独输入 END 结束：\n");
  const lines: string[] = [];
  while (true) {
    const line = await rl.question("> ");
    if (line.trim() === "END") break;
    lines.push(line);
  }
  return escapeMultiline(lines.join("\n"));
}

async function main() {
  const title = await rl.question("问题标题: ");
  const problem = await askMultiline("问题详细描述:");
  const solutionRaw = await askMultiline("解决方案步骤（每行一条）:");
  const linksRaw = await rl.question(
    "相关链接（可选，逗号分隔；建议填本仓库 commit/issue/PR，无则直接回车）: "
  );
  const keywordsRaw = await rl.question("关键词（可选，多个逗号分隔）: ");

  const solutionSteps = solutionRaw
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  const links = linksRaw
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);

  const keywords = keywordsRaw
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);

  const targetFile = await appendBuildLog({
    title,
    problem,
    solutionSteps,
    links,
    keywords
  });
  output.write(`\n已创建日志: ${targetFile}\n`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(() => rl.close());
