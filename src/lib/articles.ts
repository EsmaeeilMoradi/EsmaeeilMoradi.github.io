import { articles as entries, series, type SeriesId } from "../data/articles";
import type { Lang } from "../data/site";

export interface Article {
  slug: string;
  series: SeriesId;
  title: string;
  titleEn: string;
  description: string;
  date: string;
  dateLabel: string;
  slides: number;
  pdf: string;
  cover: string;
}

export { series };

export function getArticles(lang: Lang): Article[] {
  const fmt = new Intl.DateTimeFormat(lang === "fa" ? "fa-IR" : "en-US", { dateStyle: "long", timeZone: "UTC" });
  return entries.map((a) => ({
    slug: a.slug,
    series: a.series,
    title: lang === "fa" ? a.fa : a.en,
    titleEn: a.en,
    description: lang === "fa" ? a.dFa : a.dEn,
    date: a.date,
    dateLabel: fmt.format(new Date(a.date)),
    slides: a.slides,
    pdf: `/articles/${a.slug}.pdf`,
    cover: `/articles/covers/${a.slug}.jpg`,
  }));
}
