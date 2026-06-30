import { listLeads } from "@/services/leadService";
import type { InterestLevel, LeadSource, LeadStatus } from "@/types/lead";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const page = searchParams.get("page");
  const pageSize = searchParams.get("pageSize");
  const search = searchParams.get("search");

  const result = await listLeads({
    source: (searchParams.get("source") as LeadSource | null) || undefined,
    interestLevel: (searchParams.get("interestLevel") as InterestLevel | null) || undefined,
    status: (searchParams.get("status") as LeadStatus | null) || undefined,
    page: page ? parseInt(page, 10) : undefined,
    pageSize: pageSize ? parseInt(pageSize, 10) : undefined,
    search: search?.trim() || undefined,
  });

  return Response.json(result);
}
