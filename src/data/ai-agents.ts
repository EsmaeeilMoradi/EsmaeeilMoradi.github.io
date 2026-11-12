import type { T } from "./site";

export type AiEpisode = {
  slug: string;
  episode: number;
  date: string;
  videoId: string;
  watchUrl: string;
  title: T;
  description: T;
};

export const aiAgentsMeta = {
  path: "/ai-agents/",
  eyebrow: { en: "Series", fa: "سری" },
  title: {
    en: "Android × AI Agents",
    fa: "اندروید × AI Agent",
  },
  lead: {
    en: "A practical series for Android engineers: brief the agent, keep architecture under control, verify on a real device — then ship. Each session has a YouTube video and a written article.",
    fa: "سری عملی برای برنامه‌نویس‌های اندروید: brief کردن Agent، حفظ معماری، verify روی دستگاه واقعی — بعد ship. هر جلسه یک ویدیوی یوتیوب و یک مقاله دارد.",
  },
  watch: { en: "Watch on YouTube", fa: "تماشا در یوتیوب" },
  readOn: { en: "Open session", fa: "باز کردن جلسه" },
  back: { en: "All AI Agent sessions", fa: "همهٔ جلسات AI Agent" },
  videoLabel: { en: "Video", fa: "ویدیو" },
  articleLabel: { en: "Article", fa: "مقاله" },
  episodeWord: { en: "Episode", fa: "قسمت" },
};

export const aiEpisodes: AiEpisode[] = [
  {
    slug: "episode-0-how-android-engineers-work-with-ai-agents",
    episode: 0,
    date: "2026-11-10",
    videoId: "sag58x1rktY",
    watchUrl: "https://www.youtube.com/watch?v=sag58x1rktY",
    title: {
      en: "How Android Engineers Should Work With AI Agents",
      fa: "برنامه‌نویس اندروید چطور باید با AI Agent کار کند",
    },
    description: {
      en: "Full written companion to Episode 0 — plus the video. Method over model: four ways teams use agents, cost, harness files, bad Android specs, and how to brief for real devices.",
      fa: "مقالهٔ کامل همراه Episode 0 — به‌علاوهٔ ویدیو. روش مهم‌تر از مدل: چهار شیوهٔ کار با Agent، هزینه، harness، Spec بد روی اندروید، و brief برای دستگاه واقعی.",
    },
  },
];
