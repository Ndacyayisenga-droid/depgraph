import { getAffectedProjects } from "@/lib/data";

const SOURCES = new Set(["NVD", "GITHUB", "VULNDB", "OSSINDEX", "INTERNAL", "OSV", "SNYK", "UNKNOWN"]);

export async function GET(_request: Request, { params }: RouteContext<"/api/vulnerabilities/[source]/[vulnId]/projects">) {
  const { source, vulnId } = await params;
  if (!SOURCES.has(source) || vulnId.length === 0 || vulnId.length > 200) {
    return Response.json({ error: "invalid_vulnerability" }, { status: 400 });
  }
  try {
    return Response.json(await getAffectedProjects(source, vulnId));
  } catch (error) {
    console.error(`[vulnerabilities] affected projects for ${source}/${vulnId} failed`, error);
    return Response.json({ error: "unavailable" }, { status: 502 });
  }
}
