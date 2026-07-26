const goals = [
  "Tìm kiếm cơ hội thực tập Data Analyst trong 6 tháng tới",
  "Xây dựng CV bằng dự án, cuộc thi và kỹ năng thực tế",
  "Nâng cao tiếng Anh, hướng tới IELTS khoảng 7.0",
];

export default function Cta() {
  return (
    <section className="relative overflow-hidden border-y border-ink-400/30 bg-ink-900">
      <div
        className="absolute inset-0 opacity-70"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 70% 60% at 20% 30%, rgba(255,255,255,0.06), transparent), radial-gradient(ellipse 60% 50% at 80% 70%, rgba(255,255,255,0.04), transparent)",
        }}
      />
      <div className="relative mx-auto grid max-w-6xl gap-12 px-6 py-20 md:grid-cols-2 md:px-10 md:py-28">
        <div>
          <h2 className="font-display text-4xl uppercase leading-[0.95] tracking-wide text-bone md:text-6xl">
            Cần một cuộc
            <br />
            trò chuyện?
          </h2>
          <a
            href="mailto:ahtuan1701@gmail.com"
            className="chrome-ring mt-8 inline-flex items-center gap-3 rounded-full px-6 py-3 font-mono text-sm uppercase tracking-widest text-chrome transition-colors hover:bg-bone/10"
          >
            <span className="h-2 w-2 rounded-full bg-chrome" />
            ahtuan1701@gmail.com
          </a>
        </div>

        <div className="paper-card p-8">
          <p className="eyebrow mb-4">Đang hướng tới</p>
          <h3 className="font-display text-3xl uppercase tracking-wide text-bone">
            Mục Tiêu Hiện Tại
          </h3>
          <ul className="mt-6 space-y-4">
            {goals.map((goal) => (
              <li
                key={goal}
                className="flex items-start gap-3 font-body text-lg leading-relaxed text-bone-dim"
              >
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-chrome" />
                {goal}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
