import type { InterestLevel, LeadSource, LeadStatus } from "@/app/generated/prisma/enums";

export type { InterestLevel, LeadSource, LeadStatus };

export type ListLeadsQuery = {
  source?: LeadSource;
  interestLevel?: InterestLevel;
  status?: LeadStatus;
  search?: string;
  page?: number;
  pageSize?: number;
};

export type ListLeadsResult = {
  data: unknown[];
  meta: {
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
  };
};

export type ImportResult = {
  imported: number;
  skipped: number;
  errors: string[];
};
