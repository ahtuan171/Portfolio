import type { StaticImageData } from "next/image";
import type { L } from "@/lib/i18n/localized";

// Journey: hackathons, competitions, awards, milestones and learning
// experiences. Never invent results, rankings or awards — every entry
// below is sourced from a real project/repo. `placeholder: true` entries
// only render in `next dev` as reminders; replace or delete them.
// Labels for categories/outcomes live in the dictionaries
// (lib/i18n/dictionaries → journey.categories / journey.outcomes).

export type MilestoneCategory = "hackathon" | "competition" | "award" | "academic" | "build" | "learning";

/**
 * What actually happened. Keep these distinct — participation is never
 * described as winning:
 *   award        — won a prize, ranking or official recognition
 *   participated — took part; no award
 *   ongoing      — event still running; no result yet
 *   completed    — finished a course project, program or build
 *   shipped      — released publicly (live demo, published app)
 */
export type OutcomeKind = "award" | "participated" | "ongoing" | "completed" | "shipped";
export const OUTCOME_KINDS: OutcomeKind[] = ["award", "participated", "ongoing", "completed", "shipped"];

export interface Milestone {
  id: string;
  title: L;
  /** ISO month ("2026-08") or day. Use "TBD" only on placeholders. */
  date: string;
  endDate?: string;
  category: MilestoneCategory;
  role?: L;
  description: L;
  organizer?: string;
  outcome: { kind: OutcomeKind; detail: L };
  /** Show on the homepage (verified entries only). */
  highlight?: boolean;
  projectSlug?: string;
  links?: { label: L; href: string }[];
  certificateUrl?: string;
  image?: { src: StaticImageData; alt: L };
  placeholder?: boolean;
}

export const milestones: Milestone[] = [
  // Dates come from each repository's history (first and last commit
  // months) — adjust if the real timeline differs.
  {
    id: "victor-tracker",
    title: { en: "Built a full-stack app end to end", vi: "Tự xây dựng trọn vẹn một ứng dụng full-stack" },
    date: "2026-08",
    endDate: "2026-09",
    category: "learning",
    role: { en: "Solo developer", vi: "Làm một mình" },
    description: {
      en: "Victor Tracker: a Postgres-backed API with real auth, a live MapLibre map, an LLM console grounded in first-party data, and a merge-gated GitLab CI/CD pipeline.",
      vi: "Victor Tracker: API dùng Postgres với xác thực thật, bản đồ MapLibre, trợ lý LLM bám vào dữ liệu của chính ứng dụng và pipeline GitLab CI/CD chặn merge.",
    },
    outcome: {
      kind: "completed",
      detail: { en: "Working prototype · 647 automated tests", vi: "Bản mẫu chạy được · 647 bài test tự động" },
    },
    projectSlug: "victor-tracker",
    highlight: true,
  },
  {
    id: "web-shooter",
    title: { en: "Shipped Web-Shooter", vi: "Phát hành Web-Shooter" },
    date: "2026-08",
    category: "build",
    role: { en: "Creator", vi: "Người thực hiện" },
    description: {
      en: "Real-time hand-gesture computer vision that runs entirely in the browser — MediaPipe on WebAssembly, with zero video uploaded.",
      vi: "Thị giác máy tính nhận diện cử chỉ tay theo thời gian thực, chạy hoàn toàn trên trình duyệt — MediaPipe trên WebAssembly, không tải video lên máy chủ.",
    },
    outcome: { kind: "shipped", detail: { en: "Released · live demo online", vi: "Đã phát hành · có bản demo trực tuyến" } },
    projectSlug: "web-shooter",
    highlight: true,
  },
  {
    id: "tourxport",
    title: { en: "Led the TourXport team", vi: "Dẫn dắt nhóm TourXport" },
    date: "2026-03",
    endDate: "2026-08",
    category: "academic",
    role: { en: "Team lead", vi: "Trưởng nhóm" },
    description: {
      en: "Course project for Computational Thinking at the University of Science, VNU-HCM: an AI travel planner spanning a Flutter client, a Node.js API, a Python AI service and MongoDB.",
      vi: "Đồ án môn Tư duy tính toán tại Trường Đại học Khoa học Tự nhiên, ĐHQG-HCM: ứng dụng lập kế hoạch du lịch bằng AI gồm ứng dụng Flutter, API Node.js, dịch vụ AI bằng Python và MongoDB.",
    },
    outcome: {
      kind: "completed",
      detail: {
        en: "Live web app plus Android, Windows and Linux builds",
        vi: "Có bản web trực tuyến cùng bản build Android, Windows và Linux",
      },
    },
    projectSlug: "tourxport",
    highlight: true,
  },
  {
    id: "placeholder-competition",
    title: { en: "Your first hackathon or competition" },
    date: "TBD",
    category: "hackathon",
    description: {
      en: "Add real hackathons, competitions or awards here — event name, organizer, date, your role, and the actual outcome (award / participated / ongoing). Attach a certificate or official link if you have one.",
    },
    outcome: { kind: "ongoing", detail: { en: "Use `ongoing` until results are announced" } },
    placeholder: true,
  },
  {
    id: "placeholder-university",
    title: { en: "Started Information Technology at the University of Science, VNU-HCM" },
    date: "TBD",
    category: "academic",
    description: { en: "Add your enrollment month to turn this into a real entry." },
    outcome: { kind: "completed", detail: { en: "Enrolled" } },
    placeholder: true,
  },
];

/** Newest first, by end date when there is one. Placeholders last. */
export function sortMilestones(list: Milestone[]): Milestone[] {
  return [...list].sort((a, b) => {
    if (a.placeholder !== b.placeholder) return a.placeholder ? 1 : -1;
    return (b.endDate ?? b.date).localeCompare(a.endDate ?? a.date);
  });
}
