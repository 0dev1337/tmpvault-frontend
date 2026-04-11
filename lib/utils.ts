export function cn(...inputs: (string | undefined | null | false)[]) {
  return inputs.filter(Boolean).join(" ");
}

export function formatFileSizeMb(bytes: number): string {
  if (!Number.isFinite(bytes) || bytes < 0) return "0.00 MB";
  const mb = bytes / (1024 * 1024);
  return `${mb < 0.01 && bytes > 0 ? "<0.01" : mb.toFixed(2)} MB`;
}
