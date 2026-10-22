import pages2025 from "../data/challenge-2025-pages.json";
import { days2025 } from "../data/challenge-2025";
import { days2026 } from "../data/challenge-2026";
import type { Lang } from "../data/site";

export type Edition = "2025" | "2026";

export interface Day {
  n: number;
  slug: string;
  title: string;
  titleEn: string;
  description: string;
  slides: number;
  pdf?: string;
  cover: string;
  edition: Edition;
}

const FA_DIGITS = "۰۱۲۳۴۵۶۷۸۹";
export const num = (n: number | string, lang: Lang) =>
  lang === "fa" ? String(n).replace(/\d/g, (d) => FA_DIGITS[+d]) : String(n);

export function getDays(lang: Lang, edition: Edition = "2026"): Day[] {
  if (edition === "2025") {
    return days2025.map((d, i) => {
      const slug = String(i + 1).padStart(2, "0");
      return {
        n: i + 1,
        slug,
        title: lang === "fa" ? d.fa : d.en,
        titleEn: d.en,
        description: lang === "fa" ? d.dFa : d.dEn,
        slides: (pages2025 as Record<string, number>)[slug],
        pdf: `/challenge/2025/day-${slug}.pdf`,
        cover: `/challenge/2025/covers/${slug}.jpg`,
        edition: "2025" as const,
      };
    });
  }

  return days2026.map((d, i) => {
    const slug = String(i + 1).padStart(2, "0");
    return {
      n: i + 1,
      slug,
      title: lang === "fa" ? d.fa : d.en,
      titleEn: d.en,
      description: lang === "fa" ? d.dFa : d.dEn,
      slides: 0,
      cover: `/challenge/2026/covers/${slug}.jpg`,
      edition: "2026" as const,
    };
  });
}

export const groups = [
  { from: 1, to: 8, en: "Foundations", fa: "پایه‌ها" },
  { from: 9, to: 16, en: "Testing, networking & data", fa: "تست، شبکه و داده" },
  { from: 17, to: 24, en: "Performance, security & delivery", fa: "کارایی، امنیت و انتشار" },
  { from: 25, to: 30, en: "Architecture at scale", fa: "معماری در مقیاس بزرگ" },
];
