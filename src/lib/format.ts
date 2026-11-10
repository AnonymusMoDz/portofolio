const MONTH_YEAR = new Intl.DateTimeFormat("en-US", {
  month: "short",
  year: "numeric",
  timeZone: "UTC",
});

export function formatMonthYear(isoDate: string): string {
  return MONTH_YEAR.format(new Date(`${isoDate.slice(0, 10)}T00:00:00Z`));
}

const FULL_DATE = new Intl.DateTimeFormat("en-US", {
  month: "long",
  day: "numeric",
  year: "numeric",
  timeZone: "UTC",
});

export function formatFullDate(isoDate: string): string {
  return FULL_DATE.format(new Date(`${isoDate.slice(0, 10)}T00:00:00Z`));
}

const WORDS_PER_MINUTE = 200;

/** Reading time for a list of paragraphs, rounded up, and never below one minute. */
export function estimateReadMinutes(body: string[] = []): number {
  const words = body.flatMap((paragraph) => paragraph.trim().split(/\s+/)).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / WORDS_PER_MINUTE));
}

export function formatPeriod(start: string, end?: string): string {
  return `${formatMonthYear(start)} – ${end ? formatMonthYear(end) : "Present"}`;
}

/** Formats a German mobile, +491637989671, for reading. Other numbers are returned unchanged. */
export function formatPhone(phone: string): string {
  const match = phone.match(/^\+49(1\d{2})(\d{3})(\d{4,5})$/);
  return match ? `+49 ${match[1]} ${match[2]} ${match[3]}` : phone;
}

/** Repeats a list until it has at least `minimum` items, keeping whole rounds. */
export function repeatToFill<T>(items: T[], minimum: number): T[] {
  if (items.length === 0) return [];
  const rounds = Math.ceil(minimum / items.length);
  return Array.from({ length: rounds }, () => items).flat();
}

/** The marquee shows short names, so "AWS (EC2, S3)" becomes "AWS". */
export function shortSkillNames(items: string[]): string[] {
  return [...new Set(items.map((item) => item.replace(/\s*\(.*\)\s*$/, "")))];
}
