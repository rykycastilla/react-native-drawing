import { readFile } from 'node:fs/promises'

const ENCODE = 'utf-8'

/**
 * @param { string } filePath
 * @returns { Promise<string|null> }
*/
export async function loadContent( filePath ) {
  /** @type { string | null } */ let result
  try { result = await readFile( filePath, ENCODE ) }
  catch { result = null }
  return result
}