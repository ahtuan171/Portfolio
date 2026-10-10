import Spidey from "@/components/Spidey";
import { getActivitySummary } from "@/lib/activity";
import { fill } from "@/lib/i18n/localized";
import { getI18n } from "@/lib/i18n/server";
import { profile } from "@/content/profile";

/** Compact, theme-aware GitHub activity card. Never shows raw errors. */
export default async function ActivityWidget() {
  const { dict, date } = await getI18n();
  const activity = await getActivitySummary(profile.githubUsername);
  const profileUrl = `https://github.com/${profile.githubUsername}`;

  if (!activity) {
    return (
      <div className="card flex items-center gap-4 p-5">
        <Spidey state="asleep" className="h-10 w-auto shrink-0" />
        <div>
          <p className="meta">{dict.activity.title}</p>
          <p className="mt-1 font-body text-sm text-fg-dim">
            {dict.activity.unavailable}{" "}
            <a href={profileUrl} target="_blank" rel="noreferrer" className="link">
              {dict.activity.seeOnGithub}
            </a>
          </p>
        </div>
      </div>
    );
  }

  const max = Math.max(1, ...activity.days.map((d) => d.count));
  const summary = fill(dict.activity.chart, { total: activity.total30, streak: activity.streak });

  return (
    <div className="card p-5 md:p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="meta">{dict.activity.last30}</p>
          <p className="mt-2 flex items-baseline gap-2">
            <span className="font-display-theme text-4xl text-fg">{activity.streak}</span>
            <span className="font-body text-sm text-fg-dim">{dict.activity.streak}</span>
          </p>
          <p className="mt-1 font-body text-xs text-fg-muted">
            {fill(dict.activity.contributions, { n: activity.total30 })} ·{" "}
            {activity.committedToday ? dict.activity.today : dict.activity.notToday}
          </p>
        </div>
        <Spidey state={activity.committedToday ? "awake" : "asleep"} className="h-10 w-auto shrink-0" />
      </div>
      <div className="mt-5 flex h-16 items-end gap-[3px]" role="img" aria-label={summary}>
        {activity.days.map((d) => (
          <span
            key={d.date}
            title={fill(dict.activity.dayTitle, { date: date(d.date), n: d.count })}
            className={`flex-1 rounded-[1px] ${d.count > 0 ? "bg-accent" : "bg-line"}`}
            style={{ height: `${d.count > 0 ? Math.max(12, (d.count / max) * 100) : 6}%` }}
          />
        ))}
      </div>
      <a href={profileUrl} target="_blank" rel="noreferrer" className="text-link mt-4 inline-block normal-case tracking-normal">
        @{profile.githubUsername} <span aria-hidden>↗</span>
      </a>
    </div>
  );
}
