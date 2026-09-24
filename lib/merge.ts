export function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export function deepMerge<T>(base: T, override: unknown): T {
  if (override === undefined || override === null) return base;
  if (Array.isArray(base)) {
    if (!Array.isArray(override)) return base;
    if (base.every(isPlainObject) && override.every(isPlainObject)) {
      return override.map((item, index) => {
        const slug = typeof item.slug === "string" ? item.slug : undefined;
        const fromBase =
          (slug &&
            base.find((candidate) => (candidate as { slug?: string }).slug === slug)) ||
          base[index];
        return fromBase ? deepMerge(fromBase, item) : item;
      }) as T;
    }
    return override as T;
  }
  if (isPlainObject(base) && isPlainObject(override)) {
    const out: Record<string, unknown> = { ...base };
    for (const key of Object.keys(base as object)) {
      out[key] = deepMerge((base as Record<string, unknown>)[key], override[key]);
    }
    return out as T;
  }
  return override as T;
}
