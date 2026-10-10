import type { SpideyState } from "@/components/Spidey";
import type { L } from "@/lib/i18n/localized";

// About content, { en, vi }. Sourced from the GitHub profile README,
// design-reference/Gioi_thieu_ve_Toi.md and the owner's own descriptions of
// their interests (portfolio briefs, 2026-10). Vietnamese drafted by
// Claude — needs the owner's review (see CONTENT-TODO.md). Optional
// sections render only when their arrays are non-empty.

export const bio: L<string[]> = {
  en: [
    "I'm Phạm Anh Tuấn — Ah Tuấn, or Victor — an Information Technology student at the University of Science, VNU-HCM. I'm currently exploring the intersection of software development, data, automation, and AI.",
    "I'm learning C++, Python, web application development, and data analysis, while building projects that turn ideas into useful, interactive products. My career direction is Data Analytics, with a growing interest in UI/UX design and AI automation.",
  ],
  vi: [
    "Mình là Phạm Anh Tuấn — Ah Tuấn, hay Victor — sinh viên ngành Công nghệ Thông tin tại Trường Đại học Khoa học Tự nhiên, ĐHQG-HCM. Hiện mình đang khám phá điểm giao nhau giữa phát triển phần mềm, dữ liệu, tự động hóa và AI.",
    "Mình đang học C++, Python, phát triển ứng dụng web và phân tích dữ liệu, đồng thời xây dựng các dự án biến ý tưởng thành sản phẩm hữu ích, có tính tương tác. Định hướng nghề nghiệp của mình là Phân tích dữ liệu, cùng với sự quan tâm ngày càng lớn tới thiết kế UI/UX và tự động hóa bằng AI.",
  ],
};

/** Short version for the homepage; the full story lives on /about. */
export const summary: L = {
  en: "I'm an Information Technology student at the University of Science, VNU-HCM, heading toward Data Analytics — with a growing interest in UI/UX design and AI automation. I learn best by building: web apps, automation workflows and the occasional computer-vision experiment.",
  vi: "Mình là sinh viên Công nghệ Thông tin tại Trường Đại học Khoa học Tự nhiên, ĐHQG-HCM, đang hướng tới Phân tích dữ liệu — và ngày càng quan tâm đến thiết kế UI/UX cùng tự động hóa bằng AI. Mình học tốt nhất qua việc làm: ứng dụng web, quy trình tự động hóa và thỉnh thoảng là một thử nghiệm thị giác máy tính.",
};

export const quote: L = {
  en: "I like building things, understanding how they work, and finding ways to make them better.",
  vi: "Mình thích tạo ra mọi thứ, hiểu cách chúng vận hành và tìm cách làm chúng tốt hơn.",
};

export const pipeline: L<string[]> = {
  en: ["idea", "build", "automate", "analyze", "improve"],
  vi: ["ý tưởng", "xây dựng", "tự động hóa", "phân tích", "cải tiến"],
};

/** Career direction and technical interests (from the profile README). */
export const interests: { label: L; detail: L }[] = [
  {
    label: { en: "Data analytics", vi: "Phân tích dữ liệu" },
    detail: {
      en: "My career direction — learning SQL, Python and data analysis.",
      vi: "Định hướng nghề nghiệp — đang học SQL, Python và phân tích dữ liệu.",
    },
  },
  {
    label: { en: "AI automation", vi: "Tự động hóa bằng AI" },
    detail: {
      en: "A growing interest — building automation workflows.",
      vi: "Mối quan tâm ngày càng lớn — xây dựng các quy trình tự động hóa.",
    },
  },
  {
    label: { en: "UI/UX design", vi: "Thiết kế UI/UX" },
    detail: {
      en: "A growing interest, alongside building web apps.",
      vi: "Mối quan tâm song hành với việc xây dựng ứng dụng web.",
    },
  },
];

/** Creative pursuits, as described by the owner (portfolio briefs, 2026-10). */
export const creative: L<string[]> = {
  en: [
    "Pixel art, games and anime — the creative, imaginative side of building software.",
    "Literature, poetry and drawing.",
    "European architecture and old libraries.",
  ],
  vi: [
    "Pixel art, game và anime — phía sáng tạo, giàu trí tưởng tượng của việc làm phần mềm.",
    "Văn học, thơ ca và vẽ.",
    "Kiến trúc châu Âu và những thư viện cổ.",
  ],
};

export const education: { school: L; program: L; period?: string }[] = [
  {
    school: { en: "University of Science, VNU-HCM", vi: "Trường Đại học Khoa học Tự nhiên, ĐHQG-HCM" },
    program: { en: "Information Technology (undergraduate)", vi: "Công nghệ Thông tin (đại học)" },
    // period: "2024 – present", ← add once confirmed; not rendered until set
  },
];

/** What I value — from my own notes (Gioi_thieu_ve_Toi.md). */
export const values: { label: L; detail: L }[] = [
  {
    label: { en: "Discipline", vi: "Kỷ luật" },
    detail: {
      en: "A routine I keep: training almost daily, studying, building.",
      vi: "Một nếp sống mình giữ: tập luyện gần như mỗi ngày, học, và làm.",
    },
  },
  {
    label: { en: "Learning by building", vi: "Học qua việc làm" },
    detail: { en: "I learn best through projects.", vi: "Mình học tốt nhất qua các dự án." },
  },
  {
    label: { en: "Startups & growth", vi: "Khởi nghiệp & phát triển" },
    detail: {
      en: "Interested in how startups work and in growing as a person.",
      vi: "Quan tâm đến cách các startup vận hành và việc phát triển bản thân.",
    },
  },
];

/** ISO date the "now" block below was last true. Shown on the page. */
export const nowUpdated = "2026-08-18";

export const now: { state: SpideyState; label: L; text: L }[] = [
  {
    state: "coding",
    label: { en: "Building", vi: "Đang làm" },
    text: {
      en: "Projects around web development, automation, and data.",
      vi: "Các dự án về phát triển web, tự động hóa và dữ liệu.",
    },
  },
  {
    state: "success",
    label: { en: "Recently shipped", vi: "Vừa phát hành" },
    text: {
      en: "Web-Shooter — real-time hand-gesture computer vision in the browser.",
      vi: "Web-Shooter — thị giác máy tính nhận diện cử chỉ tay theo thời gian thực ngay trên trình duyệt.",
    },
  },
  {
    state: "thinking",
    label: { en: "Learning", vi: "Đang học" },
    text: {
      en: "C++, Python, web application development, and data analysis.",
      vi: "C++, Python, phát triển ứng dụng web và phân tích dữ liệu.",
    },
  },
];

export const goals: L[] = [
  {
    en: "Land a Data Analyst internship within the next 6 months",
    vi: "Có được vị trí thực tập Data Analyst trong khoảng 6 tháng tới",
  },
  {
    en: "Build a strong CV through projects, competitions, and real skills",
    vi: "Xây dựng CV vững chắc qua dự án, cuộc thi và kỹ năng thực tế",
  },
  {
    en: "Improve my English — aiming for an IELTS score around 7.0",
    vi: "Nâng cao tiếng Anh — hướng tới IELTS khoảng 7.0",
  },
];

/** Tools, as plain grouped text (not badges). */
export const toolkit: { label: L; items: string[] }[] = [
  { label: { en: "Languages", vi: "Ngôn ngữ" }, items: ["C", "C++", "Python", "SQL", "HTML", "CSS"] },
  { label: { en: "Frameworks", vi: "Framework" }, items: ["React", "Flutter"] },
  { label: { en: "Data", vi: "Dữ liệu" }, items: ["MySQL", "MongoDB", "Supabase"] },
  {
    label: { en: "Tools", vi: "Công cụ" },
    items: ["Git", "Docker", "Postman", "Figma", "Claude Code", "Vercel", "Render"],
  },
];

export const offTheClock: { label: L; detail?: L }[] = [
  { label: { en: "Badminton", vi: "Cầu lông" } },
  {
    label: { en: "Reading", vi: "Đọc sách" },
    detail: {
      en: "The Lean Startup, Atomic Habits, Good Vibes, Good Life",
      vi: "The Lean Startup, Atomic Habits, Good Vibes, Good Life",
    },
  },
  { label: { en: "Gym", vi: "Tập gym" }, detail: { en: "almost every day", vi: "gần như mỗi ngày" } },
  { label: { en: "Movies", vi: "Xem phim" } },
];
