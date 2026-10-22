import fs from "node:fs";
import path from "node:path";
import { marked } from "marked";

export type Slide = {
  kind: "cover" | "section" | "content";
  level: string;
  html: string;
  heading?: string;
};

const CALLOUT_RE = /^:::(trap|tip|followup|new)\s*(.*)$/;

function convertCallouts(md: string): string {
  const out: string[] = [];
  let inCode = false;
  let open = false;
  for (const line of md.split("\n")) {
    if (line.trim().startsWith("```")) inCode = !inCode;
    const m = !inCode ? CALLOUT_RE.exec(line.trim()) : null;
    if (m) {
      const [, kind, title] = m;
      out.push("", `<div class="callout ${kind}">`, "");
      if (title.trim()) out.push(`<div class="callout-title">${escapeHtml(title.trim())}</div>`, "");
      open = true;
    } else if (!inCode && open && line.trim() === ":::") {
      out.push("", "</div>", "");
      open = false;
    } else {
      out.push(line);
    }
  }
  return out.join("\n");
}

function escapeHtml(s: string) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function splitSlides(text: string): string[] {
  const slides: string[] = [];
  let current: string[] = [];
  let inCode = false;
  for (const line of text.split("\n")) {
    if (line.trim().startsWith("```")) inCode = !inCode;
    if (!inCode && line.trim() === "---") {
      slides.push(current.join("\n"));
      current = [];
    } else {
      current.push(line);
    }
  }
  slides.push(current.join("\n"));
  return slides.map((s) => s.replace(/^\n+|\n+$/g, "")).filter(Boolean);
}

function renderMd(md: string): string {
  return marked.parse(convertCallouts(md), { async: false }) as string;
}

export function loadDaySlides(day: number, lang: "en" | "fa"): Slide[] {
  const slug = String(day).padStart(2, "0");
  const file =
    lang === "fa"
      ? path.join(process.cwd(), "content/challenge/2026", `day-${slug}-fa.md`)
      : path.join(process.cwd(), "content/challenge/2026", `day-${slug}.md`);
  const raw = fs.readFileSync(file, "utf8");
  const parts = splitSlides(raw);
  let level = "";
  const slides: Slide[] = [];

  for (let src of parts) {
    let kind: Slide["kind"] = "content";
    const metaLines: string[] = [];
    const bodyLines = src.split("\n");
    while (bodyLines.length && bodyLines[0].startsWith("@")) {
      metaLines.push(bodyLines.shift()!);
    }
    for (const meta of metaLines) {
      if (meta.startsWith("@cover")) kind = "cover";
      else if (meta.startsWith("@section")) {
        kind = "section";
        level = meta.replace("@section", "").trim();
      } else if (meta.startsWith("@level")) {
        level = meta.replace("@level", "").trim();
      }
    }
    src = bodyLines.join("\n");
    const heading = /^\s*##\s+(.+)$/m.exec(src)?.[1]?.trim();
    slides.push({
      kind,
      level,
      heading,
      html: renderMd(src),
    });
  }
  return slides;
}
