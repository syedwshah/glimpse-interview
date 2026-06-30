import Link from "next/link";

import { listLeads } from "@/services/leadService";
import type { InterestLevel, LeadSource, LeadStatus } from "@/types/lead";

const SOURCES: LeadSource[] = ["Referral", "Website", "ColdCall", "Event"];
const INTEREST_LEVELS: InterestLevel[] = ["Low", "Medium", "High"];
const STATUSES: LeadStatus[] = ["New", "Closed", "Qualified", "Contacted"];

function pageUrl(
  page: number,
  filters: { source?: string; interestLevel?: string; status?: string; search?: string },
) {
  const params = new URLSearchParams();
  if (filters.search) params.set("search", filters.search);
  if (filters.source) params.set("source", filters.source);
  if (filters.interestLevel) params.set("interestLevel", filters.interestLevel);
  if (filters.status) params.set("status", filters.status);
  params.set("page", String(page));
  return `/leads?${params.toString()}`;
}

export default async function LeadsPage({
  searchParams,
}: {
  searchParams: Promise<{
    source?: string;
    interestLevel?: string;
    status?: string;
    search?: string;
    page?: string;
  }>;
}) {
  const params = await searchParams;
  const page = params.page ? parseInt(params.page, 10) : 1;
  const filters = {
    source: params.source,
    interestLevel: params.interestLevel,
    status: params.status,
    search: params.search,
  };

  const { data, meta } = await listLeads({
    source: (params.source as LeadSource) || undefined,
    interestLevel: (params.interestLevel as InterestLevel) || undefined,
    status: (params.status as LeadStatus) || undefined,
    search: params.search?.trim() || undefined,
    page,
    pageSize: 20,
  });

  const leads = data as Array<{
    leadId: number;
    name: string;
    contact: string;
    source: string;
    interestLevel: string;
    status: string;
    assignedSalesperson: string;
  }>;

  return (
    <>
      <h1>Sales Leads</h1>

      <form action="/leads" method="get">
        <label>
          Search
          <input type="search" name="search" defaultValue={params.search ?? ""} />
        </label>
        <label>
          Source
          <select name="source" defaultValue={params.source ?? ""}>
            <option value="">All</option>
            {SOURCES.map((source) => (
              <option key={source} value={source}>
                {source}
              </option>
            ))}
          </select>
        </label>
        <label>
          Interest
          <select name="interestLevel" defaultValue={params.interestLevel ?? ""}>
            <option value="">All</option>
            {INTEREST_LEVELS.map((level) => (
              <option key={level} value={level}>
                {level}
              </option>
            ))}
          </select>
        </label>
        <label>
          Status
          <select name="status" defaultValue={params.status ?? ""}>
            <option value="">All</option>
            {STATUSES.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </label>
        <button type="submit">Apply filters</button>
      </form>

      <p>
        {meta.total} total · page {meta.page} of {meta.totalPages}
      </p>

      {leads.length === 0 ? (
        <p>
          No leads match these filters.{" "}
          <Link href="/leads">Clear filters</Link> or <Link href="/leads/import">import CSV</Link>
        </p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Lead ID</th>
              <th>Name</th>
              <th>Contact</th>
              <th>Source</th>
              <th>Interest</th>
              <th>Status</th>
              <th>Salesperson</th>
            </tr>
          </thead>
          <tbody>
            {leads.map((lead) => (
              <tr key={lead.leadId}>
                <td>{lead.leadId}</td>
                <td>{lead.name}</td>
                <td>{lead.contact}</td>
                <td>{lead.source}</td>
                <td>{lead.interestLevel}</td>
                <td>{lead.status}</td>
                <td>{lead.assignedSalesperson}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {meta.page > 1 && <Link href={pageUrl(meta.page - 1, filters)}>Previous</Link>}
      {meta.page > 1 && meta.page < meta.totalPages && " | "}
      {meta.page < meta.totalPages && <Link href={pageUrl(meta.page + 1, filters)}>Next</Link>}
    </>
  );
}
