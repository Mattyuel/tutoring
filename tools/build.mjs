#!/usr/bin/env node
// Publish pass: turns worksheet Markdown into branded, print-ready A4 PDFs.
//
//   node tools/build.mjs                      # build everything under worksheets/
//   node tools/build.mjs worksheets/year-08   # build one folder (or one .md file)
//   node tools/build.mjs --html               # also keep the intermediate .html
//
// Requires: pandoc (>= 2.11) and Playwright with Chromium (npm i playwright; npx playwright install chromium).
// Output:   dist/<same path as source>/<DOC-ID>.pdf
//
// Every document gets a unique ID (see tools/README.md) printed in the header and on
// every page footer, plus a short revision hash of the source so printed copies can be
// matched to the exact version they came from.

import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { createRequire } from 'node:module';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const BRAND = JSON.parse(fs.readFileSync(path.join(ROOT, 'tools/brand.json'), 'utf8'));
const CSS = fs.readFileSync(path.join(ROOT, 'tools/worksheet.css'), 'utf8');

const args = process.argv.slice(2);
const keepHtml = args.includes('--html');
const targets = args.filter(a => !a.startsWith('--'));
if (targets.length === 0) targets.push('worksheets');

const DOC_TYPES = {
  worksheet: { code: 'WS', label: 'Worksheet' },
  homework:  { code: 'HW', label: 'Homework' },
  answers:   { code: 'AK', label: 'Answers & Teacher Notes' },
};
const SUBJECTS = { maths: { code: 'MA', label: 'Mathematics' }, english: { code: 'EN', label: 'English' } };

function collect(p) {
  const abs = path.resolve(ROOT, p);
  if (fs.statSync(abs).isFile()) return [abs];
  return fs.readdirSync(abs, { withFileTypes: true }).flatMap(d => {
    const full = path.join(abs, d.name);
    if (d.isDirectory()) return collect(full);
    return DOC_TYPES[path.basename(d.name, '.md')] && d.name.endsWith('.md') ? [full] : [];
  });
}

function describe(file) {
  // worksheets/year-08/maths/week-01/worksheet.md
  const rel = path.relative(ROOT, file).split(path.sep);
  const [, yearDir, subjectDir, weekDir, name] = rel;
  const year = yearDir.replace('year-', '');
  const week = weekDir.replace('week-', '');
  const subject = SUBJECTS[subjectDir];
  const doc = DOC_TYPES[path.basename(name, '.md')];
  const src = fs.readFileSync(file, 'utf8');
  const rev = createHash('sha1').update(src).digest('hex').slice(0, 6);
  const id = `Y${year}-${subject.code}-W${week}-${doc.code}`;
  return { file, rel: rel.join('/'), year, week, subject, doc, src, rev, id };
}

function esc(s) { return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }

function toHtml(meta) {
  let body = execFileSync('pandoc', [
    '-f', 'commonmark_x+hard_line_breaks-gfm_auto_identifiers',
    '-t', 'html5', '--mathml', '--wrap=none',
  ], { input: meta.src, encoding: 'utf8', maxBuffer: 32 * 1024 * 1024 });

  // --- Title block: first <h1> + following <h2>s + Name/Date paragraph -> branded header
  const titleRe = /^\s*<h1>([\s\S]*?)<\/h1>\s*((?:<h2>[\s\S]*?<\/h2>\s*)*)(<p><strong>Name:<\/strong>[\s\S]*?<\/p>)?/;
  const m = body.match(titleRe);
  let title = '', subs = [];
  if (m && meta.doc.code === 'AK') {
    // answer keys: keep their "## Worksheet / ## Homework" section headings in the body
    body = body.slice(body.indexOf('</h1>') + 5);
  } else if (m) {
    subs = [...m[2].matchAll(/<h2>([\s\S]*?)<\/h2>/g)].map(x => x[1]);
    body = body.slice(m[0].length);
  }
  // Title = the topic / content-text line; fall back to the worksheet's topic for answer keys.
  if (subs.length === 0) {
    const ws = path.join(path.dirname(meta.file), 'worksheet.md');
    if (fs.existsSync(ws)) {
      const t = fs.readFileSync(ws, 'utf8').match(/^## (.+)$/m);
      if (t) subs = [execFileSync('pandoc', ['-f', 'commonmark_x', '-t', 'html5'], { input: t[1], encoding: 'utf8' }).replace(/<\/?p>/g, '').trim()];
    }
  }
  if (subs.length) {
    title = subs.shift().replace(/^(Topic|Content text):\s*/, '');
    // "Title (Learning area …)" -> keep the title short, move the bracket to a subtitle
    const lm = title.match(/^(.*?)\s*\((.+)\)\s*$/);
    if (lm && lm[1].length > 8) { title = lm[1]; subs.unshift(`Learning area: ${lm[2]}`); }
  } else if (m) {
    title = m[1];
  }
  const dueLabel = meta.doc.code === 'HW' ? 'Due' : 'Date';
  const header = `
  <header class="masthead">
    <div class="brandbar">
      <span class="brand">${esc(BRAND.name)}</span>
      <span class="chip year">Year ${Number(meta.year)}</span>
      <span class="chip subject">${meta.subject.label}</span>
      <span class="chip week">Week ${Number(meta.week)}</span>
      <span class="chip doctype">${meta.doc.label}</span>
      <span class="docid"><span class="idlabel">ID</span> ${meta.id}<span class="rev">rev ${meta.rev}</span></span>
    </div>
    <h1 class="title">${title}</h1>
    ${subs.map(s => `<p class="subtitle">${s}</p>`).join('\n')}
    ${meta.doc.code === 'AK' ? '<p class="teacher-flag">Teacher copy — not for students</p>' :
      `<div class="namebox"><div><span>Name</span><i></i></div><div><span>${dueLabel}</span><i></i></div><div class="score"><span>Score / effort</span><i></i></div></div>`}
  </header>`;

  // --- Answer lines: paragraphs of only underscores -> full-width writing lines
  body = body.replace(/<p>(?:\s*_{6,}\s*)+<\/p>/g, '<div class="wline"></div>');
  // inline underscore runs -> inline answer blanks sized to the run
  body = body.replace(/_{4,}/g, u => `<span class="blank" style="width:${Math.min(u.length * 0.55, 30)}em"></span>`);
  // "> Working:" blockquotes -> working boxes
  body = body.replace(/<blockquote>\s*<p>Working:<\/p>\s*<\/blockquote>/g, '<div class="working"><span>Working</span></div>');
  // Reading passages (blockquotes that contain a heading) -> text card
  body = body.replace(/<blockquote>(\s*<h3>)/g, '<blockquote class="passage">$1');
  // Section headings: tag fast-finisher, connections, challenge
  body = body.replace(/<h2>([^<]*Fast-finisher[\s\S]*?)<\/h2>/g, '<h2 class="ff">$1</h2>');
  body = body.replace(/<h2>([^<]*Connections[\s\S]*?)<\/h2>/g, '<h2 class="conn">$1</h2>');
  body = body.replace(/<h3>([^<]*Connections[\s\S]*?)<\/h3>/g, '<h3 class="conn">$1</h3>');
  body = body.replace(/<h2>([^<]*Challenge[\s\S]*?)<\/h2>/g, '<h2 class="chal">$1</h2>');
  // drop the plain <hr> separators; headings carry the structure
  body = body.replace(/<hr \/>/g, '');

  const base = pathToFileURL(path.dirname(meta.file) + path.sep).href;
  return `<!doctype html><html lang="en-AU"><head><meta charset="utf-8">
<base href="${base}"><title>${meta.id} — ${esc(title.replace(/<[^>]+>/g, ''))}</title>
<style>:root{--accent:${BRAND.colours[meta.subject.code]};--accent-soft:${BRAND.colours[meta.subject.code + '_soft']};}</style>
<style>${CSS}</style></head>
<body class="doc-${meta.doc.code.toLowerCase()}">${header}<main>${body}</main></body></html>`;
}

// createRequire so a globally installed playwright also resolves
const { chromium } = createRequire(import.meta.url)('playwright');
const browser = await chromium.launch();
const page = await browser.newPage();
const files = targets.flatMap(collect).sort();
for (const file of files) {
  const meta = describe(file);
  const html = toHtml(meta);
  const outDir = path.join(ROOT, 'dist', path.dirname(path.relative(path.join(ROOT, 'worksheets'), file)));
  fs.mkdirSync(outDir, { recursive: true });
  const htmlPath = path.join(path.dirname(file), `.${meta.id}.build.html`);
  fs.writeFileSync(htmlPath, html);
  await page.goto(pathToFileURL(htmlPath).href, { waitUntil: 'load' });
  const foot = `<div style="font:7.5pt Inter,Arial,sans-serif;color:#667;width:100%;padding:0 14mm;display:flex;justify-content:space-between;">
    <span>${esc(BRAND.name)} · ${meta.id} · rev ${meta.rev}</span>
    <span>${esc(BRAND.footer)}</span>
    <span>Page <span class="pageNumber"></span> of <span class="totalPages"></span></span></div>`;
  const out = path.join(outDir, `${meta.id}.pdf`);
  await page.pdf({
    path: out, format: 'A4', printBackground: true,
    margin: { top: '14mm', bottom: '16mm', left: '14mm', right: '14mm' },
    displayHeaderFooter: true, headerTemplate: '<span></span>', footerTemplate: foot,
  });
  if (keepHtml) fs.copyFileSync(htmlPath, path.join(outDir, `${meta.id}.html`));
  fs.unlinkSync(htmlPath);
  console.log(`✔ ${meta.id}  rev ${meta.rev}  →  ${path.relative(ROOT, out)}`);
}
await browser.close();
