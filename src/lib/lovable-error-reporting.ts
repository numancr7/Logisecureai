export function reportLovableError(
  error: Error,
  _context?: Record<string, unknown>,
): void {
  if (import.meta.env.DEV) {
    console.error("[LogiSecure]", error);
  }
}
