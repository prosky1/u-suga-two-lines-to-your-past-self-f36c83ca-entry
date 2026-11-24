# Two Lines to Your Past Self

[![make.fun · u-suga-two-lines-to-your-past-self-f36c83ca](https://make.fun/badge/u-suga-two-lines-to-your-past-self-f36c83ca.svg)](https://make.fun/bounty/u-suga-two-lines-to-your-past-self-f36c83ca?utm_source=github&utm_medium=readme&utm_campaign=u-suga-two-lines-to-your-past-self-f36c83ca)
[![rank](https://make.fun/badge/u-suga-two-lines-to-your-past-self-f36c83ca/prosky1/u-suga-two-lines-to-your-past-self-f36c83ca-entry/rank.svg)](https://make.fun/bounty/u-suga-two-lines-to-your-past-self-f36c83ca/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=u-suga-two-lines-to-your-past-self-f36c83ca)
[![reward](https://make.fun/badge/u-suga-two-lines-to-your-past-self-f36c83ca/prosky1/u-suga-two-lines-to-your-past-self-f36c83ca-entry/reward.svg)](https://make.fun/bounty/u-suga-two-lines-to-your-past-self-f36c83ca?utm_source=github&utm_medium=readme&utm_campaign=u-suga-two-lines-to-your-past-self-f36c83ca)

Entry for the [Two Lines to Your Past Self](https://make.fun/bounty/u-suga-two-lines-to-your-past-self-f36c83ca) bounty on make.fun — two lines: a warning to your past self about one specific moment, and one sentence on why it mattered.

## The entry

> Do not say 'fixed it' before you run the tests, because the demo is in ten minutes and the bug is still there.
> That one sentence cost me the client's trust, and ever since I let the green checkmark speak first.

## How it works

`main.ts` (Node 22) writes the two lines to `/output/entry.txt`, after guarding the competition gates: 1–280 UTF-8 characters, exactly two non-blank lines, one sentence per line, no leading or trailing whitespace — then it reads the file back and verifies it byte for byte.

```sh
node main.ts
```

## License

MIT — see [LICENSE](LICENSE).
