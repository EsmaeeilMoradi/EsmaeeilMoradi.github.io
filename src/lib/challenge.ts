import pages from "../data/challenge-2025-pages.json";
import { days2025 } from "../data/challenge-2025";
import type { Lang } from "../data/site";

export interface Day {
  n: number;
  slug: string;
  title: string;
  titleEn: string;
  description: string;
  slides: number;
  pdf: string;
  cover: string;
}

const FA_DIGITS = "۰۱۲۳۴۵۶۷۸۹";
export const num = (n: number | string, lang: Lang) =>
  lang === "fa" ? String(n).replace(/\d/g, (d) => FA_DIGITS[+d]) : String(n);

export function getDays(lang: Lang): Day[] {
  return days2025.map((d, i) => {
    const slug = String(i + 1).padStart(2, "0");
    return {
      n: i + 1,
      slug,
      title: lang === "fa" ? d.fa : d.en,
      titleEn: d.en,
      description: lang === "fa" ? d.dFa : d.dEn,
      slides: (pages as Record<string, number>)[slug],
      pdf: `/challenge/2025/day-${slug}.pdf`,
      cover: `/challenge/2025/covers/${slug}.jpg`,
    };
  });
}

export const groups = [
  { from: 1, to: 8, en: "Foundations", fa: "پایه‌ها" },
  { from: 9, to: 16, en: "Testing, networking & data", fa: "تست، شبکه و داده" },
  { from: 17, to: 24, en: "Performance, security & delivery", fa: "کارایی، امنیت و انتشار" },
  { from: 25, to: 30, en: "Architecture at scale", fa: "معماری در مقیاس بزرگ" },
];
