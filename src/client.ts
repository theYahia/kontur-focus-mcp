const BASE_URL = "https://focus-api.kontur.ru/api3";
const TIMEOUT = 10_000;
const MAX_RETRIES = 3;

export async function focusGet(path: string, params: Record<string, string> = {}): Promise<unknown> {
  const apiKey = process.env.KONTUR_FOCUS_API_KEY;
  if (!apiKey) {
    throw new Error("KONTUR_FOCUS_API_KEY is required. Get one at https://focus.kontur.ru/");
  }

  const query = new URLSearchParams({ key: apiKey, ...params });

  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), TIMEOUT);

    try {
      const response = await fetch(`${BASE_URL}${path}?${query.toString()}`, {
        headers: { "Accept": "application/json" },
        signal: controller.signal,
      });
      clearTimeout(timer);

      if (response.ok) return response.json();

      if ((response.status === 429 || response.status >= 500) && attempt < MAX_RETRIES) {
        const delay = Math.min(1000 * 2 ** (attempt - 1), 8000);
        await new Promise(r => setTimeout(r, delay));
        continue;
      }

      if (response.status === 401 || response.status === 403) {
        throw new Error("Kontur.Focus: invalid API key. Check KONTUR_FOCUS_API_KEY.");
      }

      throw new Error(`Kontur.Focus HTTP ${response.status}: ${response.statusText}`);
    } catch (error) {
      clearTimeout(timer);
      if (error instanceof DOMException && error.name === "AbortError" && attempt < MAX_RETRIES) continue;
      throw error;
    }
  }
  throw new Error("Kontur.Focus: all retry attempts exhausted");
}
