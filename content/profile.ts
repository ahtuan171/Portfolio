import type { L } from "@/lib/i18n/localized";

// Single source of truth for identity, positioning and contact details.
// Text fields are { en, vi }. Components read from here — don't hard-code
// the name, role, email or links anywhere else.

export interface SocialLink {
  label: string;
  href: string;
  handle: string;
}

export interface Profile {
  /** Preferred public identity — the same in every language. */
  name: string;
  shortName: string;
  alias: string;
  /** Full legal name — shown in About, never as the headline. */
  fullName: string;
  role: L;
  positioning: L;
  intro: L;
  school: L;
  birthYear: number;
  /** null = unknown; not rendered anywhere until provided. */
  location: L | null;
  email: string;
  /**
   * Internship availability. Only rendered when `open` is true — set to
   * false once you're no longer looking.
   */
  availability: { open: boolean; label: L };
  /** Public URL or /public path to a CV PDF. null hides every CV button. */
  cvUrl: string | null;
  githubUsername: string;
  socials: SocialLink[];
}

export const profile: Profile = {
  name: "Ah Tuấn",
  shortName: "Ah Tuấn",
  alias: "Victor",
  fullName: "Phạm Anh Tuấn",
  role: {
    en: "Information Technology student · Data & AI",
    vi: "Sinh viên Công nghệ Thông tin · Dữ liệu & AI",
  },
  positioning: {
    en: "Exploring data, AI, and creative software — one experiment at a time.",
    vi: "Khám phá dữ liệu, AI và phần mềm sáng tạo — từng thử nghiệm một.",
  },
  intro: {
    en: "Information Technology student at the University of Science, VNU-HCM, working across software development, data, automation, and AI — and turning ideas into useful, interactive products.",
    vi: "Sinh viên Trường Đại học Khoa học Tự nhiên, ĐHQG-HCM, làm việc với phát triển phần mềm, dữ liệu, tự động hóa và AI — biến ý tưởng thành những sản phẩm hữu ích, có tính tương tác.",
  },
  school: {
    en: "University of Science, VNU-HCM",
    vi: "Trường Đại học Khoa học Tự nhiên, ĐHQG-HCM",
  },
  birthYear: 2006,
  location: null,
  email: "ahtuan1701@gmail.com",
  availability: {
    open: true,
    label: {
      en: "Looking for a Data Analyst internship",
      vi: "Đang tìm vị trí thực tập Data Analyst",
    },
  },
  cvUrl: null,
  githubUsername: process.env.GITHUB_USERNAME ?? "ahtuan171",
  socials: [
    { label: "GitHub", href: "https://github.com/ahtuan171", handle: "ahtuan171" },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/tu%E1%BA%A5n-ph%E1%BA%A1m-49a6a4356/",
      handle: "Tuấn Phạm",
    },
    { label: "Facebook", href: "https://www.facebook.com/ah.tuan.769406/", handle: "ah.tuan.769406" },
  ],
};

/** "Ah Tuấn (Victor)" — the canonical display form in every language. */
export const displayName = `${profile.name} (${profile.alias})`;
