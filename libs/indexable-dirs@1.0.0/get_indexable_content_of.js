import { getFileTypeList } from './get_file_type_list.js'

/**
 * @import { File } from './File.d.ts'
 * @import { Indexable } from './Indexable.d.ts'
*/

/**
 * @param { string } path
 * @param { string } extension
 * @returns { Promise<Indexable> }
*/
export async function getIndexableContentOf( path, extension ) {
  extension = `.${ extension }`  // Incluiding dot
  /** @type { File | null } */ let index = null
  const fileList = await getFileTypeList( path, extension )
  const indexRawPattern = `.*index.*${ extension }$`
  const indexPattern = new RegExp( indexRawPattern )
  /** @type { File[] } */ const content = []
  for( const file of fileList ) {
    const isIndex = indexPattern.test( file.name )
    if( isIndex && ( index === null ) ) { index = file }
    else { content.push( file ) }
  }
  return { index, content }
}
