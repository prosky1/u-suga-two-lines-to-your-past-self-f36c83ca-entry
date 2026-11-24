// Two Lines to Your Past Self — make.fun entry
// Writes the two-line warning to /output/entry.txt.
//
// Line 1 warns the past self about one specific moment, in a single
// sentence. Line 2 says in one sentence why that moment mattered and
// what changed because of it. The entry text is fixed verbatim below.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const LINE_ONE =
  "Do not say 'fixed it' before you run the tests, because the demo is in ten minutes and the bug is still there.";

const LINE_TWO =
  "That one sentence cost me the client's trust, and ever since I let the green checkmark speak first.";

const OUTPUT_PATH = "/output/entry.txt";

function fail(message: string): never {
  console.error(`entry failed: ${message}`);
  process.exit(1);
}

const entry = `${LINE_ONE}\n${LINE_TWO}`;

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
