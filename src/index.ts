#!/usr/bin/env node

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  searchCompanySchema, handleSearchCompany,
  getCompanyBriefSchema, handleGetCompanyBrief,
  getCompanyDetailsSchema, handleGetCompanyDetails,
  getFinancialStatementsSchema, handleGetFinancialStatements,
  getArbitrationCasesSchema, handleGetArbitrationCases,
  getBankruptcyInfoSchema, handleGetBankruptcyInfo,
  getLicensesSchema, handleGetLicenses,
  getRelatedCompaniesSchema, handleGetRelatedCompanies,
} from "./tools/company.js";

const server = new McpServer({ name: "kontur-focus-mcp", version: "2.0.0" });

server.tool("search_company", "Search company by INN, OGRN, or name in Kontur.Focus.", searchCompanySchema.shape,
  async (params) => ({ content: [{ type: "text", text: await handleSearchCompany(params) }] }));

server.tool("get_company_brief", "Get brief company report by INN (risk summary).", getCompanyBriefSchema.shape,
  async (params) => ({ content: [{ type: "text", text: await handleGetCompanyBrief(params) }] }));

server.tool("get_company_details", "Get full EGRUL extract for a company by INN.", getCompanyDetailsSchema.shape,
  async (params) => ({ content: [{ type: "text", text: await handleGetCompanyDetails(params) }] }));

server.tool("get_financial_statements", "Get financial statements (balance sheet, P&L) by INN.", getFinancialStatementsSchema.shape,
  async (params) => ({ content: [{ type: "text", text: await handleGetFinancialStatements(params) }] }));

server.tool("get_arbitration_cases", "Get arbitration court cases by INN.", getArbitrationCasesSchema.shape,
  async (params) => ({ content: [{ type: "text", text: await handleGetArbitrationCases(params) }] }));

server.tool("get_bankruptcy_info", "Get bankruptcy proceedings info by INN.", getBankruptcyInfoSchema.shape,
  async (params) => ({ content: [{ type: "text", text: await handleGetBankruptcyInfo(params) }] }));

server.tool("get_licenses", "Get company licenses by INN.", getLicensesSchema.shape,
  async (params) => ({ content: [{ type: "text", text: await handleGetLicenses(params) }] }));

server.tool("get_related_companies", "Get affiliated/related companies by INN.", getRelatedCompaniesSchema.shape,
  async (params) => ({ content: [{ type: "text", text: await handleGetRelatedCompanies(params) }] }));

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("[kontur-focus-mcp] Server started. 8 tools registered.");
}

main().catch((error) => { console.error("[kontur-focus-mcp] Error:", error); process.exit(1); });
