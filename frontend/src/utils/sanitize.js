export function sanitize(input) {
  if (input === null || input === undefined) return input;
  if (typeof input !== "string") return input;
  return input
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/script/gi, "")
    .replace(/onerror/gi, "")
    .replace(/onload/gi, "")
    .trim();
}