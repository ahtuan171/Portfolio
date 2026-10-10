import Link from "next/link";
import Spidey from "@/components/Spidey";
import { getI18n } from "@/lib/i18n/server";

export default async function NotFound() {
  const { dict } = await getI18n();
  return (
    <section className="shell flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
      <Spidey state="error" className="h-24 w-auto" />
      <p className="eyebrow mt-8">{dict.notFound.eyebrow}</p>
      <h1 className="page-title mt-3">{dict.notFound.title}</h1>
      <p className="mt-5 max-w-md font-body text-lg text-fg-dim">{dict.notFound.body}</p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link href="/" className="btn-primary">
          {dict.notFound.home}
        </Link>
        <Link href="/journal" className="btn-ghost">
          {dict.notFound.journal}
        </Link>
      </div>
    </section>
  );
}
