import type { StaticImageData } from "next/image";
import type { SpideyState } from "@/components/Spidey";
import type { L } from "@/lib/i18n/localized";

import vtMap from "@/public/images/projects/victor-tracker/map.jpg";
import vtSchedule from "@/public/images/projects/victor-tracker/schedule.jpg";
import vtIntel from "@/public/images/projects/victor-tracker/intel.jpg";
import txLanding from "@/public/images/projects/tourxport/landing.jpg";
import txAi from "@/public/images/projects/tourxport/ai.jpg";
import txMap from "@/public/images/projects/tourxport/map.jpg";
import wsDemo from "@/public/images/projects/web-shooter/landing.jpg";

// Project data. Every fact is sourced from the project's own README/repo.
// Prose is { en, vi } (Vietnamese drafted by Claude — needs review); URLs,
// screenshots, tags and numbers are shared across languages and themes.
// Missing optional fields render a dev-only placeholder, never filler.

export type ProjectStatus = "released" | "prototype" | "in-progress";

export interface ProjectImage {
  src: StaticImageData;
  alt: L;
  caption?: L;
}

export interface ProjectOutcome {
  value: string;
  label: L;
}

/** Layered architecture, drawn as a diagram on the case-study page. */
export interface ProjectArchitecture {
  tiers: { label: L; nodes: string[] }[];
  external?: string[];
}

export interface Project {
  slug: string;
  /** Unfinished: only rendered in `next dev`, never in production. */
  draft?: boolean;
  /** Show on the homepage's "Selected projects". */
  showOnHome?: boolean;
  featured?: boolean;
  title: string;
  tagline: L;
  description: L;
  category: L;
  role: L;
  context?: L;
  year: string;
  status: ProjectStatus;
  tags: string[];
  repoUrl: string;
  demoUrl?: string;
  demoNote?: L;
  /** Real screenshot or GIF. Without one, a generated cover is used. */
  cover?: ProjectImage;
  /** Mascot for the generated cover (Spidey theme only). */
  coverMascot: SpideyState;
  gallery?: ProjectImage[];
  overview: L<string[]>;
  problem?: L;
  contributions?: L<string[]>;
  architecture?: ProjectArchitecture;
  features: L<string[]>;
  implementation: { label: L; value: L }[];
  challenges?: L<string[]>;
  lessons?: L<string[]>;
  /** Verified numbers only (source noted in a comment). */
  outcomes?: ProjectOutcome[];
}

const tier = (en: string, vi: string) => ({ en, vi });

export const projects: Project[] = [
  {
    slug: "victor-tracker",
    featured: true,
    showOnHome: true,
    title: "Victor Tracker",
    tagline: {
      en: "A private travel-memory map with an AI console grounded in your own trips.",
      vi: "Bản đồ lưu giữ ký ức du lịch riêng tư, kèm trợ lý AI trả lời dựa trên chính chuyến đi của bạn.",
    },
    description: {
      en: "A single-user, full-stack travel memory map: pin every place you've been, planned or wished for, lay trips onto a real calendar, and ask an AI console questions it answers from your actual data.",
      vi: "Bản đồ ký ức du lịch full-stack cho một người dùng: ghim mọi nơi đã đến, dự định hay mong muốn, xếp chuyến đi lên lịch thật, và hỏi trợ lý AI — câu trả lời dựa trên dữ liệu thật của bạn.",
    },
    category: { en: "Full-stack · AI", vi: "Full-stack · AI" },
    role: { en: "Solo full-stack developer", vi: "Lập trình viên full-stack (làm một mình)" },
    year: "2026",
    status: "prototype",
    tags: ["Next.js", "TypeScript", "FastAPI", "PostgreSQL", "MapLibre GL", "LLM API", "Playwright"],
    repoUrl: "https://github.com/ahtuan171/Victor-Tracker",
    demoUrl: "https://victor-tracker-at.vercel.app",
    demoNote: { en: "private app — sign-in required", vi: "ứng dụng riêng tư — cần đăng nhập" },
    cover: {
      src: vtMap,
      alt: {
        en: "Victor Tracker's world map with status-coded pins and a place search bar",
        vi: "Bản đồ thế giới của Victor Tracker với các ghim theo trạng thái và thanh tìm kiếm địa điểm",
      },
    },
    coverMascot: "web-shoot",
    gallery: [
      {
        src: vtMap,
        alt: {
          en: "The world map, with status-coded pins and a reset-to-world-view control",
          vi: "Bản đồ thế giới với các ghim theo trạng thái và nút trở về toàn cảnh",
        },
        caption: {
          en: "The map — pins read as wishlist, planned or visited at a glance.",
          vi: "Bản đồ — nhìn ghim là biết nơi muốn đến, đã lên kế hoạch hay đã đến.",
        },
      },
      {
        src: vtSchedule,
        alt: {
          en: "The travel schedule calendar with trips and events marked",
          vi: "Lịch trình du lịch với các chuyến đi và sự kiện được đánh dấu",
        },
        caption: {
          en: "Schedule — trips and travel events on a real month calendar.",
          vi: "Lịch trình — chuyến đi và sự kiện trên lịch tháng thật.",
        },
      },
      {
        src: vtIntel,
        alt: {
          en: "The Travel Intelligence console answering with real visited destinations",
          vi: "Trợ lý Travel Intelligence trả lời bằng các điểm đến đã thực sự ghé thăm",
        },
        caption: {
          en: "Travel Intelligence — answers grounded in the user's own trips.",
          vi: "Travel Intelligence — câu trả lời dựa trên chính chuyến đi của người dùng.",
        },
      },
    ],
    overview: {
      en: [
        "Victor Tracker is a solo, learning-driven build: one account, one map of every place I've been, want to go, or have planned — with photographs and notes on the visited ones, a schedule for the ones coming up, and an AI console that reads the same data the map does.",
        "The point was working through a real full-stack app end to end: a Postgres-backed API with real auth, a map that draws real tiles and markers, a provider-neutral LLM integration grounded in first-party data, and a CI/CD pipeline that actually gates merges.",
      ],
      vi: [
        "Victor Tracker là dự án mình tự làm để học: một tài khoản, một bản đồ cho mọi nơi đã đến, muốn đến hoặc đã lên kế hoạch — có ảnh và ghi chú cho nơi đã ghé, lịch trình cho chuyến sắp tới, và một trợ lý AI đọc cùng dữ liệu với bản đồ.",
        "Mục tiêu là đi trọn một ứng dụng full-stack thực thụ: API dùng Postgres với xác thực thật, bản đồ vẽ tile và marker thật, tích hợp LLM không phụ thuộc nhà cung cấp và bám vào dữ liệu của chính ứng dụng, cùng pipeline CI/CD thật sự chặn merge khi có lỗi.",
      ],
    },
    contributions: {
      en: [
        "Solo build, end to end: the FastAPI backend and database migrations, the Next.js frontend and map, the LLM integration, the test suites and the CI/CD pipeline.",
      ],
      vi: [
        "Tự làm toàn bộ: backend FastAPI và migration cơ sở dữ liệu, frontend Next.js và bản đồ, tích hợp LLM, bộ kiểm thử và pipeline CI/CD.",
      ],
    },
    architecture: {
      tiers: [
        { label: tier("Client", "Giao diện"), nodes: ["Next.js App Router", "MapLibre GL"] },
        { label: tier("API", "API"), nodes: ["FastAPI", "JWT auth"] },
        { label: tier("Data", "Dữ liệu"), nodes: ["PostgreSQL (SQLModel + Alembic)", "Cloudflare R2"] },
      ],
      external: ["OpenAI-compatible LLM", "CARTO basemap"],
    },
    features: {
      en: [
        "World map with shield pins — hollow for wishlist, half-filled for planned, solid for visited — readable at a glance, even in grayscale.",
        "Search a real place, drop a pin, group places into Trips; destinations dated outside their trip get flagged.",
        "Collection view lists the same destinations newest-first, filterable by status and category — tapping one flies the map to its pin.",
        "Schedule lays trips and travel events (flights, stays, activities, food) onto a month calendar with a per-day detail sheet.",
        "Travel Intelligence: a chat console backed by any OpenAI-compatible provider, grounded in the user's real trips and destinations.",
        "Dark/light themes and optional sound with haptic ticks on supported phones.",
      ],
      vi: [
        "Bản đồ thế giới với ghim hình khiên — rỗng là muốn đến, nửa đặc là đã lên kế hoạch, đặc là đã đến — đọc được ngay, kể cả khi in đen trắng.",
        "Tìm địa điểm thật, thả ghim, gom địa điểm thành Chuyến đi; điểm đến có ngày nằm ngoài chuyến sẽ được đánh dấu.",
        "Chế độ Bộ sưu tập liệt kê các điểm đến mới nhất trước, lọc theo trạng thái và loại — chạm vào là bản đồ bay tới ghim đó.",
        "Lịch trình xếp chuyến đi và sự kiện (chuyến bay, chỗ ở, hoạt động, ăn uống) lên lịch tháng, kèm bảng chi tiết từng ngày.",
        "Travel Intelligence: khung trò chuyện dùng bất kỳ nhà cung cấp tương thích OpenAI nào, trả lời dựa trên chuyến đi và điểm đến thật của người dùng.",
        "Giao diện sáng/tối và âm thanh tùy chọn, có rung phản hồi trên điện thoại hỗ trợ.",
      ],
    },
    implementation: [
      { label: tier("Backend", "Backend"), value: tier("FastAPI, Python 3.13, SQLModel + Alembic, PostgreSQL", "FastAPI, Python 3.13, SQLModel + Alembic, PostgreSQL") },
      { label: tier("Frontend", "Frontend"), value: tier("Next.js (App Router), TypeScript, Tailwind 4", "Next.js (App Router), TypeScript, Tailwind 4") },
      { label: tier("Map", "Bản đồ"), value: tier("MapLibre GL JS over CARTO's dark-matter basemap", "MapLibre GL JS trên nền bản đồ dark-matter của CARTO") },
      { label: tier("AI", "AI"), value: tier("Any OpenAI-compatible chat-completions endpoint — provider-neutral by design", "Bất kỳ endpoint chat-completions tương thích OpenAI nào — thiết kế để không phụ thuộc nhà cung cấp") },
      { label: tier("Storage", "Lưu trữ"), value: tier("Cloudflare R2 with presigned PUT/GET — photographs only, never a public bucket", "Cloudflare R2 với PUT/GET ký sẵn — chỉ lưu ảnh, không bao giờ để bucket công khai") },
      { label: tier("Auth", "Xác thực"), value: tier("JWT, single seeded account, sliding session reissue", "JWT, một tài khoản tạo sẵn, gia hạn phiên trượt") },
      { label: tier("Testing", "Kiểm thử"), value: tier("pytest (backend), Playwright (unit, contract, proxy and real-browser flows)", "pytest (backend), Playwright (unit, contract, proxy và luồng trên trình duyệt thật)") },
      { label: tier("CI/CD", "CI/CD"), value: tier("GitLab CI: build → test → review → deploy, merge-request gated", "GitLab CI: build → test → review → deploy, chặn theo merge request") },
    ],
    challenges: {
      en: [
        "Drawing one privacy line on purpose: the AI reads everything about destinations and trips except photographs and personal notes. A backend test asserts the absence of that data — not just the presence of everything else.",
        "Keeping the map, collection and schedule as different views of one dataset, so there's nothing extra to keep in sync.",
      ],
      vi: [
        "Chủ động vạch một ranh giới riêng tư: AI đọc mọi thứ về điểm đến và chuyến đi, trừ ảnh và ghi chú cá nhân. Một bài test backend khẳng định dữ liệu đó không có mặt — chứ không chỉ kiểm tra phần còn lại có mặt.",
        "Giữ bản đồ, bộ sưu tập và lịch trình là các góc nhìn khác nhau của cùng một tập dữ liệu, để không phải đồng bộ thêm thứ gì.",
      ],
    },
    lessons: {
      en: [
        "A small fine-tuning experiment (dataset, training notebook, scored results) learned the output format perfectly and got the facts wrong — an honest result, and its own useful lesson about grounding answers in real data.",
      ],
      vi: [
        "Một thử nghiệm fine-tuning nhỏ (bộ dữ liệu, notebook huấn luyện, kết quả chấm điểm) học đúng hoàn toàn định dạng đầu ra nhưng sai dữ kiện — một kết quả trung thực, và là bài học đáng giá về việc để câu trả lời bám vào dữ liệu thật.",
      ],
    },
    // Source: test counts listed in the project README.
    outcomes: [
      { value: "291", label: { en: "backend tests (pytest)", vi: "bài test backend (pytest)" } },
      { value: "356", label: { en: "frontend tests (Playwright)", vi: "bài test frontend (Playwright)" } },
      { value: "4", label: { en: "stage merge-gated CI/CD pipeline", vi: "bước trong pipeline CI/CD chặn merge" } },
    ],
  },
  {
    slug: "web-shooter",
    showOnHome: true,
    title: "Web-Shooter",
    tagline: {
      en: "Strike the web-slinging pose — a web fires exactly where you point.",
      vi: "Làm tư thế bắn tơ — sợi tơ phóng đúng hướng bạn chỉ.",
    },
    description: {
      en: "A browser-based computer vision app that detects hand gestures in real time: strike the classic web-slinging pose and a web line shoots in the exact direction you're pointing, with an original hand-drawn mask tracked to your face.",
      vi: "Ứng dụng thị giác máy tính chạy trên trình duyệt, nhận diện cử chỉ tay theo thời gian thực: làm tư thế bắn tơ quen thuộc và một sợi tơ phóng ra đúng hướng bạn chỉ, kèm chiếc mặt nạ tự vẽ bám theo khuôn mặt.",
    },
    category: { en: "Computer vision · Creative coding", vi: "Thị giác máy tính · Lập trình sáng tạo" },
    role: { en: "Creator", vi: "Người thực hiện" },
    year: "2026",
    status: "released",
    tags: ["React", "Vite", "MediaPipe", "WebAssembly", "Web Audio API"],
    repoUrl: "https://github.com/ahtuan171/Web-Shooter",
    demoUrl: "https://web-shooter-kappa.vercel.app",
    demoNote: { en: "webcam required", vi: "cần webcam" },
    cover: {
      src: wsDemo,
      alt: {
        en: "Web-Shooter landing page: the headline “Raise your hand, shoot webs” beside a red-and-violet illustration of a web-slinging hero",
        vi: "Trang chủ Web-Shooter: dòng tiêu đề “Giơ tay lên, bắn tơ nhện” cạnh hình minh họa nhân vật bắn tơ tông đỏ và tím",
      },
    },
    coverMascot: "web-shoot",
    overview: {
      en: [
        "Web-Shooter turns a webcam into a web-shooter. All vision processing runs locally in the browser via MediaPipe Tasks Vision on WebAssembly — zero video data is ever uploaded to a server.",
      ],
      vi: [
        "Web-Shooter biến webcam thành bộ bắn tơ. Toàn bộ xử lý hình ảnh chạy ngay trên trình duyệt bằng MediaPipe Tasks Vision trên WebAssembly — không có dữ liệu video nào được gửi lên máy chủ.",
      ],
    },
    features: {
      en: [
        "Landing page with an introduction; camera access is only requested after clicking “Start”.",
        "Real-time 21-landmark hand tracking detects the web-slinging gesture: index and pinky extended, middle and ring fingers curled, thumb folded in.",
        "Web-shooting effects emit from the wrist along the index finger's trajectory, paired with a “thwip” synthesized live with the Web Audio API.",
        "An original spider-hero mask overlaid via face tracking — custom shape, pattern and palette, free of Marvel/Sony logos, suits or color schemes.",
      ],
      vi: [
        "Trang giới thiệu; quyền truy cập camera chỉ được xin sau khi bấm “Start”.",
        "Theo dõi 21 điểm mốc trên bàn tay theo thời gian thực để nhận diện cử chỉ bắn tơ: ngón trỏ và ngón út duỗi, ngón giữa và áp út gập, ngón cái gập vào trong.",
        "Hiệu ứng bắn tơ phát ra từ cổ tay theo hướng ngón trỏ, kèm tiếng “thwip” được tổng hợp trực tiếp bằng Web Audio API.",
        "Mặt nạ siêu anh hùng nhện tự thiết kế phủ lên mặt nhờ nhận diện khuôn mặt — hình dáng, họa tiết và màu sắc riêng, không dùng logo, trang phục hay bảng màu của Marvel/Sony.",
      ],
    },
    implementation: [
      { label: tier("Frontend", "Frontend"), value: tier("React + Vite", "React + Vite") },
      { label: tier("Vision", "Thị giác"), value: tier("@mediapipe/tasks-vision — HandLandmarker + FaceLandmarker, WebAssembly", "@mediapipe/tasks-vision — HandLandmarker + FaceLandmarker, WebAssembly") },
      { label: tier("Audio", "Âm thanh"), value: tier("Web Audio API (synthesized, no audio files)", "Web Audio API (tổng hợp trực tiếp, không dùng file âm thanh)") },
      { label: tier("Privacy", "Riêng tư"), value: tier("All inference on-device; models fetched from a CDN on first run", "Mọi suy luận chạy trên thiết bị; mô hình tải từ CDN ở lần chạy đầu") },
    ],
  },
  {
    slug: "tourxport",
    showOnHome: true,
    title: "TourXport",
    tagline: {
      en: "AI-assisted travel planning for Vietnam.",
      vi: "Lập kế hoạch du lịch Việt Nam với sự hỗ trợ của AI.",
    },
    description: {
      en: "A cross-platform app that helps travelers discover places, restaurants and hotels across Vietnam, and generates personalized itineraries from destination, budget, trip length, travelers, interests and pace.",
      vi: "Ứng dụng đa nền tảng giúp khám phá địa điểm, nhà hàng và khách sạn khắp Việt Nam, đồng thời tạo lịch trình cá nhân hóa dựa trên điểm đến, ngân sách, số ngày, số người, sở thích và nhịp độ chuyến đi.",
    },
    category: { en: "AI · Cross-platform app", vi: "AI · Ứng dụng đa nền tảng" },
    role: { en: "Team lead", vi: "Trưởng nhóm" },
    context: {
      en: "Course project — Computational Thinking, University of Science, VNU-HCM",
      vi: "Đồ án môn Tư duy tính toán, Trường Đại học Khoa học Tự nhiên, ĐHQG-HCM",
    },
    year: "2026",
    status: "released",
    tags: ["Flutter", "Node.js", "FastAPI", "MongoDB", "OpenAI API", "Docker"],
    repoUrl: "https://github.com/quocnam612/TourXport",
    demoUrl: "https://tourxport.vercel.app",
    cover: {
      src: txLanding,
      alt: {
        en: "TourXport landing page featuring Hội An with destination cards",
        vi: "Trang chủ TourXport giới thiệu Hội An cùng các thẻ điểm đến",
      },
    },
    coverMascot: "thinking",
    gallery: [
      {
        src: txLanding,
        alt: {
          en: "TourXport landing page featuring Hội An with destination cards",
          vi: "Trang chủ TourXport giới thiệu Hội An cùng các thẻ điểm đến",
        },
        caption: { en: "Landing — destination highlights across Vietnam.", vi: "Trang chủ — điểm đến nổi bật khắp Việt Nam." },
      },
      {
        src: txAi,
        alt: {
          en: "The AI Tour Maker survey asking for destination, trip length and travelers",
          vi: "Khảo sát AI Tour Maker hỏi điểm đến, số ngày và số người",
        },
        caption: {
          en: "AI Tour Maker — a short survey drives itinerary generation.",
          vi: "AI Tour Maker — một khảo sát ngắn để tạo lịch trình.",
        },
      },
      {
        src: txMap,
        alt: {
          en: "A generated day-by-day itinerary next to its route on a map",
          vi: "Lịch trình theo từng ngày được tạo ra, bên cạnh lộ trình trên bản đồ",
        },
        caption: {
          en: "Tour map — routing, distance, duration and weather per stop.",
          vi: "Bản đồ chuyến đi — lộ trình, quãng đường, thời gian và thời tiết từng điểm dừng.",
        },
      },
    ],
    overview: {
      en: [
        "TourXport combines a Flutter client, a Node.js API server, a Python AI backend, MongoDB-backed tourism data, route calculation, weather data and authentication integrations into one travel planner.",
        "It was built as an academic software project for the Computational Thinking course at the University of Science, VNU-HCM. I led the team and helped coordinate development; the repository lives under a teammate's account.",
      ],
      vi: [
        "TourXport kết hợp ứng dụng Flutter, máy chủ API Node.js, backend AI bằng Python, dữ liệu du lịch trên MongoDB, tính toán lộ trình, dữ liệu thời tiết và đăng nhập bên thứ ba thành một công cụ lập kế hoạch du lịch.",
        "Đây là đồ án phần mềm của môn Tư duy tính toán tại Trường Đại học Khoa học Tự nhiên, ĐHQG-HCM. Mình làm trưởng nhóm và điều phối quá trình phát triển; repository nằm dưới tài khoản của một thành viên trong nhóm.",
      ],
    },
    problem: {
      en: "Planning a trip from A to Z — places, food, stays, routes, weather — takes a lot of manual research. TourXport uses AI to automate that planning for destinations across Vietnam.",
      vi: "Lên kế hoạch một chuyến đi từ A đến Z — địa điểm, ăn uống, chỗ ở, lộ trình, thời tiết — tốn rất nhiều công tìm hiểu. TourXport dùng AI để tự động hóa việc đó cho các điểm đến khắp Việt Nam.",
    },
    contributions: {
      en: ["Team lead: led the team and helped coordinate development."],
      vi: ["Trưởng nhóm: dẫn dắt nhóm và điều phối quá trình phát triển."],
    },
    architecture: {
      tiers: [
        { label: tier("Client", "Giao diện"), nodes: ["Flutter (Web · Android · Windows · Linux)"] },
        { label: tier("Services", "Dịch vụ"), nodes: ["Node.js REST API", "Python FastAPI (AI)"] },
        { label: tier("Data", "Dữ liệu"), nodes: ["MongoDB", "Crawler"] },
      ],
      external: ["OpenAI", "OpenRouteService", "OpenWeatherMap", "Google / Discord login"],
    },
    features: {
      en: [
        "AI itinerary generation from destination, budget, trip length, travelers, interests and pace.",
        "Manual itinerary board with drag-and-drop planning.",
        "Place, restaurant and hotel discovery backed by a MongoDB dataset.",
        "Saved places and tours, reviews, accounts with Google/Discord login.",
        "Interactive route map with routing, distance, duration and weather context.",
      ],
      vi: [
        "Tạo lịch trình bằng AI từ điểm đến, ngân sách, số ngày, số người, sở thích và nhịp độ.",
        "Bảng lịch trình thủ công với thao tác kéo-thả.",
        "Khám phá địa điểm, nhà hàng và khách sạn từ bộ dữ liệu MongoDB.",
        "Lưu địa điểm và chuyến đi, đánh giá, tài khoản đăng nhập bằng Google/Discord.",
        "Bản đồ lộ trình tương tác với chỉ đường, quãng đường, thời gian và thời tiết.",
      ],
    },
    implementation: [
      { label: tier("Client", "Giao diện"), value: tier("Flutter — Web, Android, Windows and Linux builds", "Flutter — bản build cho Web, Android, Windows và Linux") },
      { label: tier("API", "API"), value: tier("Node.js REST API: auth, users, saved tours, reviews, routing orchestration", "Node.js REST API: xác thực, người dùng, chuyến đi đã lưu, đánh giá, điều phối lộ trình") },
      { label: tier("AI", "AI"), value: tier("Python FastAPI service — itinerary generation with RAG-style database context", "Dịch vụ Python FastAPI — tạo lịch trình với ngữ cảnh truy xuất từ cơ sở dữ liệu kiểu RAG") },
      { label: tier("Data", "Dữ liệu"), value: tier("MongoDB tourism dataset + crawler/enrichment utilities", "Bộ dữ liệu du lịch MongoDB + công cụ thu thập/làm giàu dữ liệu") },
      { label: tier("Infra", "Hạ tầng"), value: tier("Docker Compose for local orchestration", "Docker Compose để chạy cục bộ") },
    ],
    // Source: supported platforms listed in the project README.
    outcomes: [{ value: "4", label: { en: "platforms — Web, Android, Windows, Linux", vi: "nền tảng — Web, Android, Windows, Linux" } }],
  },
];

// Template for the next project (e.g. the Data Analyst project) — copy
// into the array above with real content and `draft: true` until ready:
//
// {
//   slug: "my-data-project", draft: true, showOnHome: true,
//   title: "…",
//   tagline: { en: "…", vi: "…" }, description: { en: "…", vi: "…" },
//   category: { en: "Data analysis", vi: "Phân tích dữ liệu" },
//   role: { en: "…", vi: "…" }, year: "2026", status: "in-progress",
//   tags: ["Python", "pandas", "SQL"],
//   repoUrl: "https://github.com/ahtuan171/…",
//   coverMascot: "thinking",
//   overview: { en: ["…"], vi: ["…"] }, features: { en: ["…"], vi: ["…"] },
//   implementation: [{ label: { en: "…", vi: "…" }, value: { en: "…", vi: "…" } }],
// },
