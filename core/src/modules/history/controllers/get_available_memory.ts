/**
 * Gets the maximum value of Memory available in the webview context
 * @returns Available memory (MB)
*/
export function getAvailableMemory(): number {
  if( performance.memory === undefined ) { return 1024 } // Default to 1GB if memory API is not available
  const limit: number = performance.memory.jsHeapSizeLimit
  return limit / 1024 / 1024
}
