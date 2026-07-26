import Image from "next/image";
import portrait from "@/public/images/victor-portrait.jpg";

export default function About() {
  return (
    <section id="about" className="mx-auto max-w-6xl px-6 pt-16 md:px-10 md:pt-28">
      <div className="grid items-center gap-14 md:grid-cols-2">
        <div>
          <p className="eyebrow mb-4">Giới thiệu</p>
          <h1 className="section-heading text-shadow-glow">Discipline</h1>

          <p className="mt-8 max-w-md font-body text-lg leading-relaxed text-bone-dim">
            Mình là <span className="text-bone">Phạm Anh Tuấn</span> —
            Victor — sinh năm 2006, hiện là sinh viên ngành Công nghệ Thông
            tin tại Đại học Khoa học Tự Nhiên. Mình tin vào kỷ luật, học qua
            dự án thực tế, và xây năng lực từng ngày thay vì chỉ dừng ở lý
            thuyết.
          </p>
          <p className="mt-4 max-w-md font-body text-lg leading-relaxed text-bone-dim">
            Ngoài giờ học: đọc sách phát triển bản thân, tập gym gần như mỗi
            ngày, chơi cầu lông, và viết nhật ký để tự nhìn lại chính mình —
            giữ đầu óc tỉnh táo giữa những mục tiêu dài hạn.
          </p>

          <a
            href="mailto:ahtuan1701@gmail.com"
            className="chrome-ring mt-10 inline-flex items-center gap-3 rounded-full px-6 py-3 font-mono text-sm uppercase tracking-widest text-chrome transition-colors hover:bg-bone/10"
          >
            <span className="h-2 w-2 rounded-full bg-chrome" />
            ahtuan1701@gmail.com
          </a>
        </div>

        <div className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden border border-ink-400/40">
          <Image
            src={portrait}
            alt="Chân dung Phạm Anh Tuấn (Victor)"
            fill
            priority
            className="object-cover"
            sizes="(min-width: 768px) 28rem, 90vw"
          />
          <div className="absolute inset-0 bg-vignette" />
          <p className="absolute bottom-4 left-4 font-mono text-xs uppercase tracking-widest text-bone/70">
            Phạm Anh Tuấn — b.2006
          </p>
        </div>
      </div>
    </section>
  );
}
