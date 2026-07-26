const projects = [
  {
    title: "TourXport",
    org: "Web app cá nhân — gợi ý địa điểm, tạo tour, lưu giữ kỷ niệm du lịch",
    period: "Đang phát triển",
    href: "https://github.com/ahtuan171",
  },
];

const education = [
  {
    title: "Cử nhân Công nghệ Thông tin",
    org: "Đại học Khoa học Tự Nhiên",
    period: "Hiện tại",
  },
];

function Column({
  heading,
  items,
}: {
  heading: string;
  items: { title: string; org: string; period: string; href?: string }[];
}) {
  return (
    <div>
      <h3 className="font-display text-3xl uppercase tracking-wide text-bone md:text-4xl">
        {heading}
      </h3>
      <div className="mt-8 space-y-6">
        {items.map((item) => {
          const content = (
            <>
              <div>
                <p className="font-body text-xl text-bone group-hover:text-chrome">
                  {item.title}
                  {item.href && (
                    <span className="ml-2 font-mono text-sm text-bone-muted">
                      ↗
                    </span>
                  )}
                </p>
                <p className="font-body text-base text-bone-muted">
                  {item.org}
                </p>
              </div>
              <span className="whitespace-nowrap border border-ink-400/50 px-3 py-1 font-mono text-xs uppercase tracking-widest text-chrome/80">
                {item.period}
              </span>
            </>
          );
          const className =
            "group flex items-start justify-between gap-4 border-b border-ink-400/30 pb-6";

          return item.href ? (
            <a
              key={item.title}
              href={item.href}
              target="_blank"
              rel="noreferrer"
              className={className}
            >
              {content}
            </a>
          ) : (
            <div key={item.title} className={className}>
              {content}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function Resume() {
  return (
    <section id="resume" className="mx-auto max-w-6xl px-6 py-24 md:px-10 md:py-32">
      <p className="eyebrow mb-4">Học vấn &amp; Dự án</p>
      <h2 className="section-heading mb-16">Hồ Sơ Của Tôi</h2>

      <div className="grid gap-16 md:grid-cols-2 md:gap-24">
        <Column heading="Dự án & Hoạt động" items={projects} />
        <Column heading="Học vấn" items={education} />
      </div>
    </section>
  );
}
