import { spawn } from "node:child_process";
import { appendBuildLog } from "./build-log-utils";

interface ParsedArgs {
  title?: string;
  command: string;
}

function parseArgs(argv: string[]): ParsedArgs {
  const split = argv.indexOf("--");
  if (split === -1) {
    throw new Error('用法: tsx scripts/run-with-auto-log.ts --title "标题" -- <command>');
  }

  const before = argv.slice(0, split);
  const after = argv.slice(split + 1);
  const titleIndex = before.indexOf("--title");
  const title = titleIndex >= 0 ? before[titleIndex + 1] : undefined;
  return { title, command: after.join(" ").trim() };
}

function pickErrorLine(output: string) {
  const lines = output
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);
  return (
    lines.find((line) => /error|exception|failed|unhandled/i.test(line)) ??
    lines.find((line) => /ELIFECYCLE|ERR_|TypeError|ReferenceError|SyntaxError/i.test(line)) ??
    lines.at(-1) ??
    "命令执行失败。"
  );
}

async function run() {
  const { title, command } = parseArgs(process.argv.slice(2));
  if (!command) throw new Error("缺少需要执行的命令。");

  const child = spawn(command, { shell: true, stdio: ["inherit", "pipe", "pipe"] });
  let mergedOutput = "";

  child.stdout.on("data", (chunk) => {
    const text = chunk.toString();
    mergedOutput += text;
    process.stdout.write(text);
  });

  child.stderr.on("data", (chunk) => {
    const text = chunk.toString();
    mergedOutput += text;
    process.stderr.write(text);
  });

  const exitCode = await new Promise<number>((resolve) => {
    child.on("close", (code) => resolve(code ?? 1));
  });

  if (exitCode === 0) return;

  const trimmed = mergedOutput.trim();
  const firstError = pickErrorLine(trimmed);
  const excerpt = trimmed.split(/\r?\n/).slice(-30).join("\n");
  const logTitle = title ?? `命令失败：${firstError.slice(0, 48)}`;

  const target = await appendBuildLog({
    title: logTitle,
    problem: [
      `命令执行失败：\`${command}\``,
      `退出码：${exitCode}`,
      `关键报错：${firstError}`
    ].join("\n"),
    solutionSteps: [
      "查看错误堆栈和首个异常行，定位根因。",
      "修复配置或代码后重新执行同一命令。",
      "确认命令返回 0，并验证页面或构建结果正常。"
    ],
    keywords: ["auto-log", "command-failure"],
    extraMarkdown: `## 自动捕获输出\n\n\`\`\`text\n${excerpt}\n\`\`\``
  });

  console.warn(`\n[auto-log] 已自动记录到建设日志: ${target}`);
  process.exit(exitCode);
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
