// Multi-category support without changing the DB schema type: category stays
// a string column, but now stores either a legacy single value or a JSON array
// of category names.

export function parseProductCategories(raw: string | null | undefined): string[] {
  if (!raw) return [];
  const trimmed = raw.trim();
  if (!trimmed) return [];

  if (trimmed.startsWith("[")) {
    try {
      const parsed = JSON.parse(trimmed);
      if (Array.isArray(parsed)) {
        return uniqueCategories(
          parsed
            .map((item) => String(item).trim())
            .filter(Boolean),
        );
      }
    } catch {
      // Fall through to legacy single-category handling.
    }
  }

  return [trimmed];
}

export function serializeProductCategories(categories: string[]): string {
  const unique = uniqueCategories(categories.map((c) => c.trim()).filter(Boolean));
  if (unique.length === 0) return "";
  if (unique.length === 1) return unique[0];
  return JSON.stringify(unique);
}

export function primaryCategory(raw: string | null | undefined): string {
  return parseProductCategories(raw)[0] ?? "";
}

function uniqueCategories(categories: string[]): string[] {
  return Array.from(new Set(categories));
}
