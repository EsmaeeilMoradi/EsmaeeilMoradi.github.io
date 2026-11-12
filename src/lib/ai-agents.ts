import fs from "node:fs";
import path from "node:path";
import { marked } from "marked";
import { aiEpisodes, type AiEpisode } from "../data/ai-agents";
import type { Lang } from "../data/site";

export type AiEpisodePage = AiEpisode & {
  titleLocal: string;
  descriptionLocal: string;
  dateLabel: string;
  bodyHtml: string;
};

function articlePath(slug: string, lang: Lang) {
  const file = lang === "fa" ? `${slug}.fa.md` : `${slug}.md`;
  return path.join(process.cwd(), "content", "ai-agents", file);
}

export function getAiEpisodes(lang: Lang): AiEpisodePage[] {
  const fmt = new Intl.DateTimeFormat(lang === "fa" ? "fa-IR" : "en-US", {
    dateStyle: "long",
    timeZone: "UTC",
  });
  return aiEpisodes.map((ep) => {
    const mdPath = articlePath(ep.slug, lang);
    const fallback = articlePath(ep.slug, "en");
    const md = fs.existsSync(mdPath)
      ? fs.readFileSync(mdPath, "utf8")
      : fs.readFileSync(fallback, "utf8");
    return {
      ...ep,
      titleLocal: ep.title[lang],
      descriptionLocal: ep.description[lang],
      dateLabel: fmt.format(new Date(ep.date)),
      bodyHtml: marked.parse(md, { async: false }) as string,
    };
  });
}

export function getAiEpisode(slug: string, lang: Lang): AiEpisodePage | undefined {
  return getAiEpisodes(lang).find((e) => e.slug === slug);
}
