const GITHUB_GRAPHQL_ENDPOINT = "https://api.github.com/graphql";

export interface ContributionDay {
  date: string;
  count: number;
}

interface ContributionCalendarResponse {
  data?: {
    user: {
      contributionsCollection: {
        contributionCalendar: {
          weeks: {
            contributionDays: {
              date: string;
              contributionCount: number;
            }[];
          }[];
        };
      };
    } | null;
  };
  errors?: { message: string }[];
}

const CONTRIBUTIONS_QUERY = `
  query ($username: String!) {
    user(login: $username) {
      contributionsCollection {
        contributionCalendar {
          weeks {
            contributionDays {
              date
              contributionCount
            }
          }
        }
      }
    }
  }
`;

/**
 * Without a token, read the same public contribution calendar GitHub draws
 * on a profile page (an HTML fragment, no auth). It's unofficial markup, so
 * the parse is strict and any surprise throws — callers fall back quietly.
 */
async function getPublicContributionDays(username: string): Promise<ContributionDay[]> {
  const res = await fetch(`https://github.com/users/${encodeURIComponent(username)}/contributions`, {
    next: { revalidate: 3600 },
  });
  if (!res.ok) {
    throw new Error(`GitHub contributions page failed: ${res.status} ${res.statusText}`);
  }
  const html = await res.text();

  // Each day is a <td id="…" data-date="YYYY-MM-DD">; its count lives in a
  // <tool-tip for="id">"N contributions on …" / "No contributions on …".
  const counts = new Map<string, number>();
  for (const m of html.matchAll(/<tool-tip[^>]*\sfor="([^"]+)"[^>]*>\s*(No|\d+) contributions?\b/g)) {
    counts.set(m[1], m[2] === "No" ? 0 : Number(m[2]));
  }
  const days: ContributionDay[] = [];
  for (const m of html.matchAll(/<td\b[^>]*>/g)) {
    const date = /data-date="(\d{4}-\d{2}-\d{2})"/.exec(m[0])?.[1];
    const id = /\bid="([^"]+)"/.exec(m[0])?.[1];
    if (date && id && counts.has(id)) days.push({ date, count: counts.get(id) ?? 0 });
  }
  if (days.length < 30) {
    throw new Error("Could not read the public contribution calendar");
  }
  return days;
}

export async function getContributionDays(
  username: string
): Promise<ContributionDay[]> {
  const token = process.env.GITHUB_TOKEN;
  if (!token) {
    return getPublicContributionDays(username);
  }

  const res = await fetch(GITHUB_GRAPHQL_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: CONTRIBUTIONS_QUERY,
      variables: { username },
    }),
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    throw new Error(`GitHub API request failed: ${res.status} ${res.statusText}`);
  }

  const json: ContributionCalendarResponse = await res.json();

  if (json.errors?.length) {
    throw new Error(json.errors.map((e) => e.message).join("; "));
  }

  if (!json.data?.user) {
    throw new Error(`GitHub user "${username}" not found`);
  }

  return json.data.user.contributionsCollection.contributionCalendar.weeks.flatMap(
    (week) =>
      week.contributionDays.map((day) => ({
        date: day.date,
        count: day.contributionCount,
      }))
  );
}
