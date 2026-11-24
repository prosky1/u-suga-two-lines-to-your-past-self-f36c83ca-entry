// Two Lines to Your Past Self — make.fun entry (TOP 1 V2b)
// Writes the two-line warning to /output/entry.txt.
//
// Line 1 warns the past self about one specific moment — skipping the
// backup before a small migration — in a single sentence. Line 2 says
// in one sentence why that moment mattered: the skipped backup cost a
// year of photos of the writer's daughter, and changed how they work.
// The entry text is fixed verbatim below.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const LINE_ONE =
  "Do not skip the backup because the migration is small and you have done it a hundred times.";

const LINE_TWO =
  "That skipped backup ate my daughter's first year of photos, and now I back up before I touch anything.";

const OUTPUT_PATH = "/output/entry.txt";

function fail(message: string): never {
  console.error(`entry failed: ${message}`);
  process.exit(1);
}

const entry = `${LINE_ONE}\n${LINE_TWO}`;

// Guard: exactly one newline separator — no trailing newline, no extra
// blank line. The scorer counts every character, so a stray newline at
// the end would still pass the gate but change the submitted text.
const newlineCount = (entry.match(/\n/g) ?? []).length;
if (newlineCount !== 1 || entry.endsWith("\n")) {
  fail(`entry must contain exactly one newline separator, got ${newlineCount}`);
}

// Guard: byte length must equal character length here (pure ASCII text),
// so the Size column on the leaderboard matches the counted characters.
const byteCount = Buffer.byteLength(entry, "utf8");
if (byteCount !== charCountOf(entry)) {
  fail(`byte length ${byteCount} differs from character count`);
}
function charCountOf(text: string): number {
  return [...text].length;
}

// Gate: the sealed scorer accepts UTF-8 text of 1 to 280 characters.
const charCount = [...entry].length;
if (charCount < 1 || charCount > 280) {
  fail(`entry is ${charCount} characters, outside the 1-280 range`);
}

// Gate: exactly two lines, neither blank, each exactly one sentence:
// one sentence-ending mark, and it must sit at the very end of the line.
const lines = entry.split("\n");
if (lines.length !== 2 || lines.some((line) => line.trim().length === 0)) {
  fail(`entry must be exactly two non-blank lines, got ${lines.length}`);
}
for (const [index, line] of lines.entries()) {
  if (line !== line.trim()) {
    fail(`line ${index + 1} has leading or trailing whitespace`);
  }
  const terminators = line.match(/[.!?]/g) ?? [];
  if (terminators.length !== 1 || !/[.!?]$/.test(line)) {
    fail(`line ${index + 1} must be exactly one sentence, got: ${line}`);
  }
}

mkdirSync("/output", { recursive: true });
writeFileSync(OUTPUT_PATH, entry, "utf8");

// Read-back check: the file on disk must be byte-for-byte what we wrote.
const written = readFileSync(OUTPUT_PATH, "utf8");
if (written !== entry) {
  fail("read-back mismatch: /output/entry.txt differs from the entry text");
}
console.log(`wrote ${charCount} characters to ${OUTPUT_PATH}`);
console.log(
  `line 1: ${[...lines[0]].length} chars, line 2: ${[...lines[1]].length} chars`,
);
