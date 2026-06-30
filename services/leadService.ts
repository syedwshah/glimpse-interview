import prisma from "@/lib/prisma";
import type { ListLeadsQuery, ListLeadsResult } from "@/types/lead";

const DEFAULT_PAGE_SIZE = 20;

function buildWhere(query: ListLeadsQuery) {
  const source = query.source || undefined;
  const interestLevel = query.interestLevel || undefined;
  const status = query.status || undefined;
  const search = query.search?.trim() || undefined;

  return {
    source,
    interestLevel,
    status,
    OR: search
      ? [
          { name: { contains: search, mode: "insensitive" as const } },
          { contact: { contains: search, mode: "insensitive" as const } },
          { assignedSalesperson: { contains: search, mode: "insensitive" as const } },
        ]
      : undefined,
  };
}

export async function listLeads(query: ListLeadsQuery = {}): Promise<ListLeadsResult> {
  const page = Math.max(1, query.page ?? 1);
  const pageSize = Math.min(100, Math.max(1, query.pageSize ?? DEFAULT_PAGE_SIZE));
  const skip = (page - 1) * pageSize;
  const where = buildWhere(query);

  const [data, total] = await Promise.all([
    prisma.lead.findMany({
      where,
      skip,
      take: pageSize,
      orderBy: { leadId: "asc" },
    }),
    prisma.lead.count({ where }),
  ]);

  return {
    data,
    meta: {
      total,
      page,
      pageSize,
      totalPages: Math.max(1, Math.ceil(total / pageSize)),
    },
  };
}
