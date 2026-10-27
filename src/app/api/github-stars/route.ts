import { cacheLife } from "next/cache";

const REPOSITORY = "shashank-chaubey/code-monitor";

async function getGitHubStarCount() {
  "use cache";
  cacheLife("minutes");

  const response = await fetch(`https://api.github.com/repos/${REPOSITORY}`, {
    headers: { Accept: "application/vnd.github+json" },
  });

  if (!response.ok) return null;

  const repository: { stargazers_count: number } = await response.json();
  return repository.stargazers_count;
}

export async function GET() {
  const stars = await getGitHubStarCount();
  if (stars === null) {
    return Response.json({ error: "Unable to load GitHub stars" }, { status: 502 });
  }

  return Response.json(
    { stargazers_count: stars },
  );
}
