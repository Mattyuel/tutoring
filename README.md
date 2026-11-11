# Tutoring Hub

Worksheets, programs and reference material for tutoring in Western Australia.

- **Start here:** [`CLAUDE.md`](CLAUDE.md) — how the repo is organised and where each kind of request goes.
- **Curriculum:** [`curriculum/`](curriculum/) — WA Curriculum summaries by year level.
- **Programs:** [`programs/`](programs/) — week-by-week sequences (Year 4 & Year 8, Maths & English).
- **Worksheets:** [`worksheets/`](worksheets/) — `year-XX/<subject>/week-NN/` → `worksheet.md`, `homework.md`, `answers.md`.
- **Templates:** [`templates/`](templates/) — style guide and blank templates.

## Printing

Worksheets are Markdown. To print, open on GitHub and print the page, or convert:

```bash
pandoc worksheets/year-08/maths/week-01/worksheet.md -o worksheet.pdf
```

> Keep this repository **private** — `students/` contains notes about real students.
