import { join } from 'node:path'
import { readdir, stat } from 'node:fs/promises'

/**
 * @param { string } path
 * @param { string } extension
 * @returns { Promise<string[]> }
*/
export async function findFileType( path, extension ) {
  const itemList = await readdir( path )
  /** @type { string[] } */ const fileList = []
  for( const item of itemList ) {
    const itemPath = join( path, item )
    const { isFile } = await stat( itemPath )
    if( isFile && ( item.endsWith( extension ) ) ) { fileList.push( itemPath ) }
  }
  return fileList
}