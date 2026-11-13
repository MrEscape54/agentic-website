// Stable source-copy keys: punctuation and whitespace changes are deliberate copy changes.
export function messageKey(source: string): string {
  let hash = 2166136261;
  for (let index = 0; index < source.length; index++) {
    hash = Math.imul(hash ^ source.charCodeAt(index), 16777619);
  }
  return `m${(hash >>> 0).toString(16)}`;
}
