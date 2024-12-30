import { findFileType } from './find_file_type.js'
import { loadContent } from './load_content.js'

/**
 * @import { File } from './File'
*/

/**
 * @param { string } path
 * @param { string } extension
 * @returns { Promise<File[]> }
*/
export async function getFileTypeList( path, extension ) {
  const filePathList = await findFileType( path, extension )
  /** @type { File[] } */ const fileList = []
  for( const filePath of filePathList ) {
    const name = filePath.replace( path, '' )
    const data = await loadContent( filePath )
    fileList.push( { name, data } )
  }
  return fileList
}