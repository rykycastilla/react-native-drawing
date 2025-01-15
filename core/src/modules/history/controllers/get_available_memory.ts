/**
 * Gets the maximum value of Memory available in the webview context
 * @returns Available memory (MB)
*/
export function getAvailableMemory(): number {
  const limit: number = performance.memory.jsHeapSizeLimit
  return limit / 1024 / 1024
}
