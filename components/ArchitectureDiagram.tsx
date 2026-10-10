import type { ProjectArchitecture } from "@/content/projects";
import { fill } from "@/lib/i18n/localized";
import { getI18n } from "@/lib/i18n/server";

/**
 * Layered architecture drawn from the project's documented components —
 * tiers top to bottom, external services alongside. Pure HTML/CSS so it
 * follows the active theme and stays readable to screen readers.
 */
export default async function ArchitectureDiagram({ architecture, title }: { architecture: ProjectArchitecture; title: string }) {
  const { dict, t } = await getI18n();
  return (
    <figure className="grid gap-6 lg:grid-cols-[1fr_14rem]">
      <ol className="space-y-0" aria-label={fill(dict.project.architectureAria, { title })}>
        {architecture.tiers.map((tier, i) => (
          <li key={tier.label.en}>
            {i > 0 && (
              <div className="flex justify-center py-1.5 text-accent" aria-hidden>
                <svg viewBox="0 0 12 20" className="h-5 w-3" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M6 0v18M1.5 13.5 6 18l4.5-4.5" />
                </svg>
              </div>
            )}
            <div className="card grid gap-3 p-4 sm:grid-cols-[6.5rem_1fr] sm:items-center">
              <p className="meta text-accent">{t(tier.label)}</p>
              <ul className="flex flex-wrap gap-2">
                {tier.nodes.map((n) => (
                  <li key={n} className="rounded-theme border border-line bg-surface-2/60 px-3 py-1.5 font-body text-sm text-fg">
                    {n}
                  </li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ol>
      {architecture.external && (
        <div className="rounded-theme border border-dashed border-line p-4">
          <p className="meta mb-3">{dict.project.externalServices}</p>
          <ul className="space-y-2">
            {architecture.external.map((e) => (
              <li key={e} className="font-body text-sm text-fg-dim">
                {e}
              </li>
            ))}
          </ul>
        </div>
      )}
      <figcaption className="sr-only">{fill(dict.project.architectureCaption, { title })}</figcaption>
    </figure>
  );
}
