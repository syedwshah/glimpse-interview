import type { ImportResult, InterestLevel, LeadSource, LeadStatus } from "@/types/lead";
import prisma from "@/lib/prisma";

type CsvRow = {
  leadId: number;
  name: string;
  contact: string;
  source: string;
  interestLevel: string;
  status: string;
  assignedSalesperson: string;
};

function mapSource(source: string): LeadSource {
  if (source === "Cold Call") return "ColdCall";
  return source as LeadSource;
}

export function parseCsv(text: string): CsvRow[] {
  const lines = text.trim().split("\n");
  const body = lines.slice(1);

  return body.map((line) => {
    const [
      leadId,
      name,
      contact,
      source,
      interestLevel,
      status,
      assignedSalesperson,
    ] = line.trim().split(",");

    return {
      leadId: parseInt(leadId.trim(), 10),
      name: name.trim(),
      contact: contact.trim(),
      source: source.trim(),
      interestLevel: interestLevel.trim(),
      status: status.trim(),
      assignedSalesperson: assignedSalesperson.trim(),
    };
  });
}

export async function importLeadsFromCsv(csvText: string): Promise<ImportResult> {
  const rows = parseCsv(csvText);
  let imported = 0;
  let skipped = 0;
  const errors: string[] = [];

  for (const row of rows) {
    try {
      await prisma.lead.upsert({
        where: { leadId: row.leadId },
        create: {
          leadId: row.leadId,
          name: row.name,
          contact: row.contact,
          source: mapSource(row.source),
          interestLevel: row.interestLevel as InterestLevel,
          status: row.status as LeadStatus,
          assignedSalesperson: row.assignedSalesperson,
        },
        update: {
          name: row.name,
          contact: row.contact,
          source: mapSource(row.source),
          interestLevel: row.interestLevel as InterestLevel,
          status: row.status as LeadStatus,
          assignedSalesperson: row.assignedSalesperson,
        },
      });
      imported++;
    } catch (error) {
      skipped++;
      errors.push(`${row.leadId}: ${String(error)}`);
    }
  }

  return { imported, skipped, errors };
}
