# Worksheet Style Guide

## Audience
Advanced, motivated students. Pitch at or above year level. Avoid busywork: every
question should practise a skill, deepen understanding, or require reasoning.

## Timing (one-hour worksheet)
| Section | Maths | English |
|---|---|---|
| Warm-up / Retrieval (earlier weeks) | 5–8 min | 5 min |
| Learn / Worked examples | 5–10 min | — |
| Reading the content text | — | 10–12 min |
| Core practice (fluency → reasoning) | 25–30 min | 20–25 min (comprehension, language) |
| Problem solving / Writing task | 10–15 min | 15–20 min |
| Challenge (beyond year level) | 10–15 min | 10–15 min |
| **Fast-finisher bank** (graded extra work) | 30–40 min | 30–40 min |

Show `⏱ ~N min` against each section heading. **Total material ≈ 90–100 min** so that
even a very fast student never runs out. The core alone should fill an hour for a
typical advanced student; Challenge + Fast-finisher bank absorb any spare time and can
roll over into homework or the next session.

### Fast-finisher bank
- Sits at the end of every worksheet, after the self-check.
- 8–12 items, graded ⭐⭐ → ⭐⭐⭐⭐ (⭐⭐⭐⭐ = competition / next-year level).
- Maths: extra mixed practice, then non-routine and competition-style problems
  (Australian Maths Competition style), plus one open investigation.
- English: extra analysis questions on the same text, a second short related text or
  source, sentence-craft drills, and an extended creative or research task.
- All answers go in `answers.md`.

## Difficulty ladder (within each section)
1. ⭐ Fluency — can you do it?
2. ⭐⭐ Understanding — can you explain or apply it in a familiar context?
3. ⭐⭐⭐ Reasoning / unfamiliar problems — multi-step, justify, generalise.

Most questions should be ⭐⭐ or ⭐⭐⭐ for these students.

## Building week-on-week
- Warm-up revisits **1–2 earlier weeks** (spaced retrieval), not just last week.
- Name prior concepts explicitly ("Remember from Week 2…").
- Homework mixes ~70 % this week and ~30 % earlier weeks.

## The "wholistic" English approach
- Every English worksheet is built around an **original, factually accurate content text**
  (Year 4: 350–550 words; Year 8: 700–1000 words) taken from the same year's
  Science or HASS curriculum (see `curriculum/year-XX.md`).
- Questions cover three layers:
  1. **Content** — what did you learn about the world? (literal + inferential)
  2. **Craft** — how does the text work? (structure, language choices, the literacy focus)
  3. **Connection** — apply / evaluate / link to the student's world or other subjects.
- Vocabulary tasks favour subject-specific and Tier 2 words; Year 8 adds etymology.
- The writing task reuses the content so the student consolidates knowledge while writing.
- Include a short glossary box for genuinely technical words.

## Connections (required)
- A `### 🔗 Connections` section (inside Practice for maths; after Part C for English),
  3–6 questions, ~10 min.
- The new concept must be **applied inside an earlier topic**, not just revised next to it:
  - algebra week → perimeter/area of shapes with algebraic sides; equations from angle sums
  - percentages week → % increase in area when sides grow; GST on a measurement problem
  - English text on cells → maths (scale, magnification), science diagram interpretation
- Draw on the program's *Connections plan* and earlier weeks' content (or the previous
  year level's content in Week 1).

## Diagrams
- Hand-written SVG in the week's `diagrams/` folder; embed with
  `![Descriptive caption that also works as alt text](diagrams/name.svg)`.
- Style: white background, Inter/Arial text 12–15 px, subject colour (maths `#1f4e8c`,
  English `#0f6b5c`, connections `#b45309`), 1.5–2.5 px strokes, labels outside shapes
  with straight leader lines, "not to scale" where relevant.
- Never let a diagram give away an answer; every diagram must be referenced by a question.
- Good uses: factor trees, Venn diagrams, number lines, labelled shapes with unknowns,
  timelines, process diagrams (formation stages), labelled science diagrams, maps.

## Homework (~20–30 min)
- Maths: mixed practice + one rich problem; includes spaced revision.
- English: a short related text, extension research, or vocabulary + sentence work; often
  a "teach someone at home" prompt to consolidate content knowledge.

## Answers (`answers.md`)
- Full worked solutions for maths (show method, not just the answer).
- Model answers for English, plus *marking notes*: what a strong response includes.
- *Teacher notes*: common misconceptions, how to extend, sources for facts.

## Answer space
Size every answer space from the model answer in `answers.md` — never one generic line.
- `<!-- lines:N -->` on its own line after the question → N ruled lines (invisible on GitHub).
- `<!-- work:N -->` → a dashed working box N lines tall (maths calculations, factor trees).
- `<!-- draw:N -->` → the same box labelled "Draw here" (drawing tasks).
- Inline `________` only for one word / one number answers.

| Answer type | Year 4 (≈7 words/line) | Year 8 (≈10 words/line) |
|---|---|---|
| Single word / number | inline blank | inline blank |
| One sentence | 2 lines | 1–2 lines |
| Explain / justify (2–3 sentences) | 3–4 lines | 3 lines |
| Inference / evaluation with evidence | 4–5 lines | 4–5 lines |
| Paragraph (≈100 words) | ~16 lines | ~11 lines |
| Paragraph (150–200 words) | — | ~20 lines |
| Extended piece (250 words) | ~35 lines | ~24 lines |
| Maths: 1–2 step calculation | work:2–3 | work:2–3 |
| Maths: multi-step / factor trees / proofs | work:5–8 | work:4–8 |

Rule of thumb: word target ÷ words-per-line, + 10–20 % spare. Rule lines are 9 mm apart for Year 4 and 8 mm for Year 8.

## Publishing
Run `node tools/build.mjs worksheets/year-XX/<subject>/week-NN` → branded PDFs in `dist/`
with unique IDs (`Y08-MA-W01-WS rev xxxxxx`). See `tools/README.md`.
Markdown conventions the build relies on:
- `# Year … — Week …` then `## Topic: …` (or `## Content text: …`) then `**Name:** …` line.
- `> Working:` (alone in a blockquote) → working box. Reading passages = blockquote starting with `###`.
- Headings containing *Challenge*, *Connections*, *Fast-finisher* get special styling.

## Formatting
- Title block: Year, Subject, Week, Topic, Name/Date lines.
- Learning intentions ("By the end of this worksheet I can…") and a short self-check at the end.
- Australian spelling; metric units; `$` = AUD; WA contexts welcome.
- Markdown tables for data; keep diagrams describable in text (or put images in `materials/images/`).

## Year 3 English track (comprehension & world knowledge)
Used for `worksheets/year-03/english/`. These are **full Year 3 worksheets pitched at a typical-to-strong
Year 3 level, with challenge** — usable for any Year 3 class or student. They are currently also used
with a Year 4 student who is behind in reading comprehension, so every week teaches comprehension
**explicitly** and builds a solid, correct picture of how the world works. Never make them sparse:
a capable Year 3 should be busy and stretched.

**Length:** core ≈ 60–70 min, plus a **⚡ Keep going** bank (~25 min, ⭐ → ⭐⭐⭐). Total ≈ 90 min.

**Every week has this shape**
| Part | ⏱ | What it does |
|---|---|---|
| A · Warm-up | 5 | Retrieval: last week's Big Idea, spelling words, a sentence to edit (Week 31: diagnostic) |
| B · Before reading | 7 | **Big Idea** box; "What do I already think?" prediction (revisited later); **6–8 key words** with meanings; the week's **Reading toolkit card** with a worked "I do" think-aloud |
| C · Read in chunks | 15 | Text **500–700 words** in **4–5 headed chunks** (100–150 words each) with real facts, numbers, a little history of the idea, and Year 3–4 vocabulary. After each chunk a **🛑 Stop and check** (2–3 questions incl. the strategy) |
| D · After reading | 15 | **12–16 questions**: 👆 Right there (give the chunk), 🔍 Think and search, 💭 Author and me, plus **vocabulary in context** and **text features** (headings, captions, glossary, diagrams). Roughly ⅓ each |
| E · Big Idea check | 6 | Misconception ("Sam thinks… Is Sam right?"), true / false / not in the text (6–8 items), explain the diagram, revisit the prediction |
| F · Grammar & punctuation | 10 | Rule box with examples from the text, 3–4 practice tasks incl. **editing a short paragraph** and writing own sentences |
| G · Spelling | 8 | Pattern + related patterns (sort), suffixes/homophones linked to the pattern, look–say–cover–write–check (10–12 words), **two dictation sentences** |
| H · Writing | 12 | An explanation or recount of **80–120 words** with a planner and a word bank (sentence starters only as an optional support box); 5–6 item checklist |

**Text rules:** clear, mostly 8–18-word sentences with some longer ones; precise vocabulary taught
in context (bold + glossary); headings for every chunk; everyday comparisons (a ball, a torch, a
merry-go-round); a diagram that matches the words exactly; name and correct the misconception.
Facts correct, simplified but not dumbed down (real numbers rounded sensibly).

**Questions:** say where to look for 👆 questions; one thing per question; mix formats (write,
tick, circle, match, order, draw, table). Include at least two 💭 inference questions that need
reasoning, and one question that asks *how the writer helps the reader understand*.

**Answer space:** Year 3 handwriting ≈ 5–6 words per line; ruled lines are 10 mm apart.

**Answer key extras:** a *How to run it* note per part (read-aloud vs independent, prompts, what to do
if stuck), misconceptions to listen for, and *What to record* in the student's notes file.
