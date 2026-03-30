#!/usr/bin/env node

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  searchCompanySchema, handleSearchCompany,
  getBriefReportSchema, handleGetBriefReport,
  getAnalyticsSchema, handleGetAnalytics,
  checkReliabilitySchema, handleCheckReliability,
} from "./tools/company.js";

const server = new McpServer({ name: "kontur-focus-mcp", version: "1.0.0" });

server.tool("search_company", "Search company by INN or OGRN in Kontur.Focus.", searchCompanySchema.shape,
  async (params) => ({ content: [{ type: "text", text: await handleSearchCompany(params) }] }));

server.tool("get_brief_report", "Get brief report for a company by INN.", getBriefReportSchema.shape,
  async (params) => ({ content: [{ type: "text", text: await handleGetBriefReport(params) }] }));

server.tool("get_analytics", "Get financial analytics for a company by INN.", getAnalyticsSchema.shape,
  async (params) => ({ content: [{ type: "text", text: await handleGetAnalytics(params) }] }));

server.tool("check_reliability", "Check counterparty reliability by INN.", checkReliabilitySchema.shape,
  async (params) => ({ content: [{ type: "text", text: await handleCheckReliability(params) }] }));

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("[kontur-focus-mcp] Server started. 4 tools registered.");
}

main().catch((error) => { console.error("[kontur-focus-mcp] Error:", error); process.exit(1); });
