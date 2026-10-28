#!/usr/bin/env node
/**
 * Rebuild src/data/kotlin-quiz-questions.json from kt-notes snippets + notes.html
 * Usage: node scripts/build-kotlin-quiz.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const NOTES = process.env.KT_NOTES_HTML || "/home/esmaeeil/Downloads/kt-notes/notes.html";
const SNIP = process.env.KT_NOTES_SNIPPETS || "/home/esmaeeil/Downloads/kt-notes/snippets";
const OUT = path.join(ROOT, "src/data/kotlin-quiz-questions.json");

function toAsciiDigits(s) {
  return s.replace(/[۰-۹]/g, (d) => "۰۱۲۳۴۵۶۷۸۹".indexOf(d).toString());
}

function stripTags(html) {
  return toAsciiDigits(
    html
      .replace(/<br\s*\/?>/gi, "\n")
      .replace(/<\/p>/gi, "\n")
      .replace(/<\/li>/gi, "\n")
      .replace(/<[^>]+>/g, "")
      .replace(/&quot;/g, '"')
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&amp;/g, "&")
      .replace(/&nbsp;/g, " ")
      .replace(/\n{3,}/g, "\n\n")
      .trim()
  );
}

const html = fs.readFileSync(NOTES, "utf8");
const parts = html.split(/<hr\s*\/?>/i);
const metaByNum = new Map();
const metaByExercise = new Map();

for (const part of parts) {
  const h2 = part.match(/<h2>([\s\S]*?)<\/h2>/i);
  if (!h2) continue;
  const title = stripTags(h2[1]).replace(/\s+/g, " ").trim();
  const puzzleMatch = title.match(/^پازل\s+(\d+)/);
  const exerciseMatch = title.match(/^تمرین\s+(\d+)/);

  let explain = "";
  const bq = part.match(/<blockquote>([\s\S]*?)<\/blockquote>/i);
  if (bq) explain = stripTags(bq[1]).replace(/^جملهٔ جلسه:\s*/i, "").trim();
  if (!explain) {
    const trap = part.match(/<p><strong>تله:<\/strong>([\s\S]*?)<\/p>/i);
    if (trap) explain = stripTags(trap[1]);
  }

  /** @type {string[]} */
  let steps = [];
  const afterTrack = part.match(
    /<p><strong>ردگیری:<\/strong><\/p>\s*<ol>([\s\S]*?)<\/ol>/i
  );
  if (afterTrack) {
    steps = [...afterTrack[1].matchAll(/<li>([\s\S]*?)<\/li>/gi)].map((m) =>
      stripTags(m[1]).replace(/\s+/g, " ").trim()
    ).filter(Boolean);
  } else {
    const ulTrack = part.match(
      /<p><strong>ردگیری:<\/strong><\/p>\s*<ul>([\s\S]*?)<\/ul>/i
    );
    if (ulTrack) {
      steps = [...ulTrack[1].matchAll(/<li>([\s\S]*?)<\/li>/gi)].map((m) =>
        stripTags(m[1]).replace(/\s+/g, " ").trim()
      ).filter(Boolean);
    }
  }

  if (puzzleMatch) metaByNum.set(Number(puzzleMatch[1]), { title, explain, steps });
  if (exerciseMatch) metaByExercise.set(Number(exerciseMatch[1]), { title, explain, steps });
}

function categoryFor(id) {
  if (id.startsWith("l")) return "coding";
  const n = Number(id.slice(1));
  if (n <= 15) return "construction";
  if (n <= 28) return "language";
  if (n <= 36) return "coroutines";
  return "flow";
}

const categoryLabel = {
  construction: { fa: "ساخت شیء و ارث‌بری", en: "Construction & inheritance" },
  language: { fa: "زبان کاتلین", en: "Kotlin language" },
  coroutines: { fa: "کوروتین", en: "Coroutines" },
  flow: { fa: "Flow", en: "Flow" },
  coding: { fa: "تمرین کدنویسی", en: "Coding drills" },
};

const files = fs.readdirSync(SNIP).filter((f) => f.endsWith(".kt")).sort();
const allOutputs = [];
const raw = [];

for (const file of files) {
  const id = file.replace(/\.kt$/, "");
  const code = fs.readFileSync(path.join(SNIP, file), "utf8").trimEnd();
  const outPath = path.join(SNIP, `${id}.output.txt`);
  if (!fs.existsSync(outPath)) continue;
  const output = fs.readFileSync(outPath, "utf8").replace(/\s+$/, "");
  allOutputs.push(output);
  raw.push({ id, code, output });
}

function isSaneOutput(o) {
  if (!o || o.length > 800) return false;
  if (/fun\s+main\s*\(/.test(o)) return false;
  if (/abstract class|override fun/.test(o)) return false;
  return true;
}

function pickDistractors(correct, pool, n = 3) {
  const uniq = [...new Set(pool.filter((o) => o !== correct && isSaneOutput(o)))];
  for (let i = uniq.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [uniq[i], uniq[j]] = [uniq[j], uniq[i]];
  }
  const picked = uniq.slice(0, n);
  while (picked.length < n) {
    const lines = correct.split("\n").filter(Boolean);
    picked.push(lines.slice().reverse().join("\n") || `alt-${picked.length}`);
  }
  return picked;
}

function seededShuffle(arr, seed) {
  const a = [...arr];
  let s = seed;
  for (let i = a.length - 1; i > 0; i--) {
    s = (s * 1103515245 + 12345) & 0x7fffffff;
    const j = s % (i + 1);
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function printLineIndices(code) {
  return code
    .split("\n")
    .map((line, i) => (/println\s*\(|\bprint\s*\(/.test(line) ? i : -1))
    .filter((i) => i >= 0);
}

const questions = raw.map((item, index) => {
  const cat = categoryFor(item.id);
  let titleFa = item.id;
  let explainFa = "خروجی واقعی برنامه همین است. ترتیب چاپ را خط‌به‌خط از روی کد ردگیری کن.";
  /** @type {string[]} */
  let steps = [];
  if (item.id.startsWith("p")) {
    const num = Number(item.id.slice(1));
    const meta = metaByNum.get(num);
    if (meta) {
      titleFa = meta.title;
      if (meta.explain) explainFa = meta.explain;
      steps = meta.steps || [];
    } else titleFa = `پازل ${num}`;
  } else if (item.id.startsWith("l")) {
    const num = Number(item.id.slice(1));
    const meta = metaByExercise.get(num);
    if (meta) {
      titleFa = meta.title;
      if (meta.explain) explainFa = meta.explain;
      steps = meta.steps || [];
    } else titleFa = `تمرین ${num}`;
  }

  const distractors = pickDistractors(item.output, allOutputs, 3);
  const options = seededShuffle(
    [item.output, ...distractors],
    item.id.split("").reduce((a, c) => a + c.charCodeAt(0), 0)
  );

  const outputLines = item.output.split("\n");
  return {
    id: item.id,
    order: index + 1,
    category: cat,
    categoryFa: categoryLabel[cat].fa,
    categoryEn: categoryLabel[cat].en,
    titleFa,
    titleEn: titleFa,
    code: item.code,
    options,
    answerIndex: options.indexOf(item.output),
    explainFa,
    explainEn: explainFa,
    stepsFa: steps,
    stepsEn: steps,
    outputLines,
    printLines: printLineIndices(item.code),
    seconds: 60,
  };
});

fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(OUT, JSON.stringify({ generatedAt: new Date().toISOString(), count: questions.length, questions }, null, 2));
console.log(`Wrote ${questions.length} questions → ${OUT}`);
