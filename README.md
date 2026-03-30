# @theyahia/kontur-focus-mcp

MCP server for **Kontur.Focus API** -- company search, brief reports, financial analytics, and counterparty reliability checks for Russian legal entities.

Part of the **Russian API MCP series** alongside [`@theyahia/dadata-mcp`](https://www.npmjs.com/package/@theyahia/dadata-mcp), [`@theyahia/huntflow-mcp`](https://www.npmjs.com/package/@theyahia/huntflow-mcp), [`@theyahia/superjob-mcp`](https://www.npmjs.com/package/@theyahia/superjob-mcp), and [`@theyahia/yookassa-mcp`](https://www.npmjs.com/package/@theyahia/yookassa-mcp).

## Tools

| Tool | Description |
|------|-------------|
| `search_company` | Search company by INN or OGRN |
| `get_brief_report` | Brief company report by INN |
| `get_analytics` | Financial analytics by INN |
| `check_reliability` | Counterparty reliability check by INN |

## Install

### Claude Desktop / Cline / Cursor

Add to your MCP config:

```json
{
  "mcpServers": {
    "kontur-focus": {
      "command": "npx",
      "args": ["-y", "@theyahia/kontur-focus-mcp"],
      "env": { "KONTUR_FOCUS_API_KEY": "<YOUR_API_KEY>" }
    }
  }
}
```

### Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `KONTUR_FOCUS_API_KEY` | Yes | API key from [Kontur.Focus](https://focus.kontur.ru/) |

## Synergy with dadata-mcp

Use **dadata-mcp** to resolve a company name, address, or partial input into an INN, then pass that INN to **kontur-focus-mcp** for deep due diligence:

1. `suggest_company` (dadata-mcp) -- find the company and get its INN
2. `search_company` (kontur-focus-mcp) -- full registration data
3. `get_brief_report` -- risk summary
4. `get_analytics` -- financials
5. `check_reliability` -- counterparty check

This two-server combo gives AI agents a complete Russian company intelligence pipeline.

## API Reference

Base URL: `https://focus-api.kontur.ru/api3/`

Docs: [https://focus-api.kontur.ru/](https://focus-api.kontur.ru/)

## License

MIT
