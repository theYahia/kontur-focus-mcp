> ## 🗄 Репозиторий заархивирован
>
> Разработка переехала в **[theYahia/WWmcp](https://github.com/theYahia/WWmcp)** — монорепозиторий MCP-серверов для незападных API: СНГ, MENA, Африка, LATAM, Юго-Восточная Азия. Общее ядро `@theyahia/mcp-core`, единый CI, единый релизный конвейер.
>
> Актуальная версия того, что лежало здесь: [`servers/kontur-focus/`](https://github.com/theYahia/WWmcp/tree/main/servers/kontur-focus)
>
> Пакет в npm прежний — [`@theyahia/kontur-focus-mcp`](https://www.npmjs.com/package/@theyahia/kontur-focus-mcp), ставится и работает как раньше.
> Здесь больше ничего не обновляется. Задачи и pull request'ы — в WWmcp.
>
> **Archived — development moved to [theYahia/WWmcp](https://github.com/theYahia/WWmcp),** a monorepo of MCP servers for non-Western APIs.
> The current version of this package now lives at [`servers/kontur-focus/`](https://github.com/theYahia/WWmcp/tree/main/servers/kontur-focus).
> The npm package [`@theyahia/kontur-focus-mcp`](https://www.npmjs.com/package/@theyahia/kontur-focus-mcp) is unchanged.
> Please open issues and pull requests there.

# Контур.Фокус MCP — проверка контрагента по ИНН через нейросеть

Если вы искали, как проверить контрагента по ИНН прямо в диалоге с ИИ, поднять выписку из ЕГРЮЛ, посмотреть арбитраж и банкротство или собрать финансовую отчётность юрлица без ручного поиска — это оно. 8 инструментов поверх **Kontur.Focus API**: поиск компаний, краткая справка с рисками, полная выписка ЕГРЮЛ, бухгалтерская отчётность, арбитражные дела, банкротство, лицензии и связанные компании.

Часть серии **MCP-серверов к российским API** вместе с [`@theyahia/dadata-mcp`](https://www.npmjs.com/package/@theyahia/dadata-mcp), [`@theyahia/spark-interfax-mcp`](https://www.npmjs.com/package/@theyahia/spark-interfax-mcp) и [`@theyahia/casebook-mcp`](https://www.npmjs.com/package/@theyahia/casebook-mcp).

## Инструменты

| Инструмент | Описание |
|------|-------------|
| `search_company` | Поиск компании по ИНН, ОГРН или названию |
| `get_company_brief` | Краткая справка по компании со сводкой рисков |
| `get_company_details` | Полная выписка из ЕГРЮЛ |
| `get_financial_statements` | Баланс, отчёт о прибылях и убытках, финансовая аналитика |
| `get_arbitration_cases` | Дела в арбитражных судах |
| `get_bankruptcy_info` | Процедуры банкротства |
| `get_licenses` | Лицензии компании |
| `get_related_companies` | Аффилированные и связанные компании |

## Установка

### Claude Desktop / Cline / Cursor

Добавьте в конфигурацию MCP:

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

### Переменные окружения

| Переменная | Обяз. | Описание |
|----------|----------|-------------|
| `KONTUR_FOCUS_API_KEY` | да | Ключ API из [Контур.Фокус](https://focus.kontur.ru/) |

## Демо-промпты

- «Найди информацию о компании по ИНН 7707083893»
- «Покажи выписку из ЕГРЮЛ по Сбербанку»
- «Достань бухгалтерскую отчётность по ИНН 7736050003»
- «Есть ли арбитражные дела по ИНН 7710140679?»
- «Проверь статус банкротства по ИНН 5024164553»
- «Какие лицензии у компании с ИНН 7802849731?»
- «Покажи аффилированные компании по ИНН 7707083893»
- «Найди компании с названием „Яндекс“»

## Справочник API

Базовый URL: `https://focus-api.kontur.ru/api3/`

Документация: [https://focus-api.kontur.ru/](https://focus-api.kontur.ru/)

## Лицензия

MIT

---

Telegram: [@vhodvai](https://t.me/vhodvai)
