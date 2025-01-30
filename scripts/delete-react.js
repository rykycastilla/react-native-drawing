import { rm, stat } from 'node:fs/promises'

const REACT_DIR = '.node_modules/react/'

async function main() {
  const reactDuplicated = await isDir( REACT_DIR )
  if( reactDuplicated ) { await rmDir( REACT_DIR ) }
  console.log( 'Module adpated to load react of parent project' )
}

main()

/**
 * @param { string } path
 * @returns { Promise<boolean> }
*/
async function isDir( path ) {
  let stats
  try { stats = await stat( path ) }
  catch { return false }
  return stats.isDirectory()
}

/**
 * @param { string } path
*/
async function rmDir( path ) {
  await rm( path, { recursive:true } )
}
