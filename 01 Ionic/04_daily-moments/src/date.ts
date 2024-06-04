export function formatDate(isoString: string): string {
  return new Date(isoString).toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}
