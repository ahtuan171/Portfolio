const skills = ["C/C++", "Python", "OOP", "DSA", "SQL", "Design", "English Communication"];

export default function Skills() {
  return (
    <section
      id="skills"
      className="mx-auto max-w-6xl px-6 py-24 md:px-10 md:py-32"
    >
      <p className="eyebrow mb-4">Chuyên môn</p>
      <h2 className="section-heading mb-16">Kỹ Năng.</h2>

      <div className="grid gap-16 md:grid-cols-2 md:gap-24">
        <p className="font-body text-lg leading-relaxed text-bone-dim">
          Nền tảng kỹ thuật xây từ lập trình và cấu trúc dữ liệu, mở rộng
          sang thiết kế sản phẩm và khả năng giao tiếp — những gì cần để đi
          từ ý tưởng đến một dự án chạy được thật sự.
        </p>

        <div className="flex flex-wrap content-start gap-3">
          {skills.map((skill) => (
            <span
              key={skill}
              className="chrome-ring rounded-full px-5 py-2 font-mono text-sm uppercase tracking-widest text-bone transition-colors hover:bg-bone/10 hover:text-chrome"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
