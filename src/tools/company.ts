import { z } from "zod";
import { focusGet } from "../client.js";

// --- search_company ---

export const searchCompanySchema = z.object({
  inn: z.string().optional().describe("INN (taxpayer ID) of the company"),
  ogrn: z.string().optional().describe("OGRN (registration number) of the company"),
});

export async function handleSearchCompany(params: z.infer<typeof searchCompanySchema>): Promise<string> {
  if (!params.inn && !params.ogrn) {
    throw new Error("Either inn or ogrn must be provided.");
  }
  const query: Record<string, string> = {};
  if (params.inn) query.inn = params.inn;
  if (params.ogrn) query.ogrn = params.ogrn;
  const result = await focusGet("/req", query);
  return JSON.stringify(result, null, 2);
}

// --- get_brief_report ---

export const getBriefReportSchema = z.object({
  inn: z.string().describe("INN of the company"),
});

export async function handleGetBriefReport(params: z.infer<typeof getBriefReportSchema>): Promise<string> {
  const result = await focusGet("/briefReport", { inn: params.inn });
  return JSON.stringify(result, null, 2);
}

// --- get_analytics ---

export const getAnalyticsSchema = z.object({
  inn: z.string().describe("INN of the company"),
});

export async function handleGetAnalytics(params: z.infer<typeof getAnalyticsSchema>): Promise<string> {
  const result = await focusGet("/analytics", { inn: params.inn });
  return JSON.stringify(result, null, 2);
}

// --- check_reliability ---

export const checkReliabilitySchema = z.object({
  inn: z.string().describe("INN of the company to check"),
});

export async function handleCheckReliability(params: z.infer<typeof checkReliabilitySchema>): Promise<string> {
  const result = await focusGet("/counterparties", { inn: params.inn });
  return JSON.stringify(result, null, 2);
}
