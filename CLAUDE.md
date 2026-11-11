# CLAUDE.md — Tutoring Hub

This repository is a hub for one-on-one / small-group tutoring in **Western Australia**.
It holds curriculum references, term programs (scope & sequence), templates, student
notes and finished worksheets. Students are **advanced and well-behaved** — default to
work pitched *at or above* year level, never below.

## Route the request → read these docs first

| If the request is about… | Read first | Then write to |
|---|---|---|
| A new worksheet (any year/subject) | `templates/style-guide.md`, the matching `programs/year-XX-<subject>.md`, the previous week's worksheet in `worksheets/` | `worksheets/year-XX/<subject>/week-NN/` |
| What a year level should be learning | `curriculum/wa-overview.md`, `curriculum/year-XX.md` | — |
| Planning / changing the week-by-week sequence | `programs/README.md`, `programs/year-XX-<subject>.md`, `curriculum/year-XX.md` | `programs/` |
| A specific student (progress, gaps, adjusting difficulty) | `students/README.md`, `students/<name>.md` | `students/<name>.md` |
| Formatting / layout / a new worksheet type | `templates/` (all files) | `templates/` |
| Reading passages, images, reference facts, reusable texts | `materials/README.md` | `materials/` |
| Homework or answer keys | `templates/style-guide.md` (Homework & Answers sections) | same `week-NN/` folder as the worksheet |

`XX` is the two-digit year level (`04`, `08`). `<subject>` is `maths` or `english`.

## Repository map

```
curriculum/   WA Curriculum (SCSA) summaries per year level, all learning areas
programs/     40-week full-year scope & sequence per year + subject (the "spine")
templates/    Style guide + Markdown templates for worksheets, homework, answers, notes
worksheets/   Finished work: year-XX/<subject>/week-NN/{worksheet,homework,answers}.md
students/     Per-student notes (private — keep this repo private)
materials/    Shared reading passages, fact sheets, images, data sets
```

## Non-negotiable rules for worksheets

1. **Follow the program.** Each week's topic comes from `programs/year-XX-<subject>.md`.
   If you deviate, update the program file in the same change.
2. **Build week-on-week.** Every worksheet opens with a short *Warm-up / Retrieval*
   section that revisits earlier weeks (interleaving). Read the previous 1–2 weeks first.
3. **Never let a fast student run out.** Core work = ~60 min for an advanced student,
   with time estimates on each section. Then a *Challenge* section beyond year level,
   **plus a Fast-finisher bank of ~30–40 min of harder, graded extra work**. Total
   material per worksheet should be ~90–100 min. Too much is fine; too little is not.
4. **Every week = three files:** `worksheet.md`, `homework.md` (~20–30 min),
   `answers.md` (full worked solutions / model answers + marking notes).
5. **English is "wholistic".** Every English worksheet is built around an
   information-rich text about science, civics & citizenship, history, geography or
   economics (drawn from the same year's WA Science/HASS curriculum). Students learn
   literacy skills *and* real-world content in the same lesson. See the style guide.
6. **Australian English & WA context.** Australian spelling (colour, organise,
   metre), metric units, AUD, and WA places/examples where natural.
7. **Accuracy matters.** Facts in reading passages must be correct. If unsure of a
   figure, leave it out or round it and phrase cautiously; never invent statistics.
   Record sources for non-obvious facts in `answers.md` under *Teacher notes*.
8. **Student privacy.** Use first names only in `students/`; never put student
   details into worksheets or external services.

## Conventions

- Markdown only (renders on GitHub, converts cleanly to PDF/Word with pandoc).
- Week folders are zero-padded: `week-01`, `week-02` …
- Answer lines: use `______________________` ; working space: a blank fenced block or
  `> Working:` followed by blank lines.
- After writing a new week, tick it off in the program file's status column.
