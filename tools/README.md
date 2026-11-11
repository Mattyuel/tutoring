# tools/ — the publish pass

`build.mjs` turns worksheet Markdown into branded, print-ready **A4 PDFs**.

```bash
node tools/build.mjs                                  # everything in worksheets/
node tools/build.mjs worksheets/year-08/maths/week-01 # one week
node tools/build.mjs --html                           # also keep the HTML
```

Output goes to `dist/year-XX/<subject>/week-NN/<DOC-ID>.pdf` (committed so PDFs can be downloaded from GitHub).

**Needs:** [pandoc](https://pandoc.org) ≥ 2.11 and Node 18+ with Playwright (`npm install`, then `npx playwright install chromium`).

## Unique document IDs

Every document is stamped with an ID in the masthead and on every page footer:

```
Y08-MA-W01-WS  rev 2d50fd
│   │  │   │       └── first 6 hex of the SHA-1 of the source .md (changes whenever content changes)
│   │  │   └── WS worksheet · HW homework · AK answer key
│   │  └── week number
│   └── MA maths · EN english
└── year level
```

So a printed sheet can always be matched to the exact source version (`git log -S` or compare the rev to a rebuild).

## What the pass does
- Branded masthead (subject colour, year/week/doc-type chips, ID box) + Name / Date / Score boxes.
- Answer keys get a "Teacher copy" flag instead of name boxes.
- `______` runs → answer blanks; lines of only underscores → full-width writing lines.
- `> Working:` blockquotes → dashed working boxes.
- Blockquotes starting with a `###` heading → reading-passage cards (serif type).
- `## …Challenge`, `## …Connections` / `### …Connections`, `## …Fast-finisher` headings get distinct colours; the Fast-finisher bank starts on a new page.
- Diagrams: any `![caption](diagrams/name.svg)` is embedded with its caption.
- Footer on every page: brand · ID · rev · page X of Y.

Branding (name, footer text, colours) lives in `brand.json`; layout in `worksheet.css`.
