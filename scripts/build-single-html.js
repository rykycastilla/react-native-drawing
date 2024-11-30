import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { readdir, readFile, stat, writeFile } from 'node:fs/promises'
import { stringify } from '../libs/json-doc@1.0.0/index.js'

const __filename = fileURLToPath( import.meta.url )
const __dirname = dirname( __filename )

const SOURCE_DIR = '../core/dist/assets/'
const ENCODE = 'utf-8'
const BUILD_JSON = '../build.json'

/**
 * @param { Array<string|undefined> } args
*/
async function main( args ) {
  const [ option ] = args
  const sourceDir = join( __dirname, SOURCE_DIR )
  const buildPath = join( __dirname, BUILD_JSON )
  if( option === '--blank' ) { return buildBlank( buildPath ) }
  await buildSingleHtml( sourceDir, buildPath )
}

/**
 * @param { string } javascript
 * @param { string } css
 * @returns { string }
*/
function buildHtml( javascript, css ) {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <script type="module">
      ${ javascript }
    </script>
    <style>
      ${ css }
    </style>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>
`
}

/**
 * @param { string } path
 * @param { string } extension
 * @returns { Promise<Array<string|undefined>> }
*/
async function findFileType( path, extension ) {
  const itemList = await readdir( path )
  /** @type { string[] } */ const fileList = []
  for( const item of itemList ) {
    const itemPath = join( path, item )
    const { isFile } = await stat( itemPath )
    if( isFile && ( item.endsWith( extension ) ) ) { fileList.push( itemPath ) }
  }
  return fileList
}

/**
 * @param { string } filePath
 * @returns { Promise<string|null> }
*/
async function loadContent( filePath ) {
  /** @type { string | null } */ let result
  try { result = await readFile( filePath, ENCODE ) }
  catch { result = null }
  return result
}

/**
 * @param { string } path
 * @param { string } extension
 * @returns { string | null }
*/
async function getContentOf( path, extension ) {
  const [ file ] = await findFileType( path, extension )
  return ( typeof file === 'string' ) ? loadContent( file ) : null
}

/**
 * @param { string } javascript
 * @param { string } css
 * @param { string } buildPath
*/
async function genBuild( javascript, css, buildPath ) {
  const html = buildHtml( javascript, css )
  const buildContent = stringify( { html } )
  await writeFile( buildPath, buildContent )
}

/**
 * @param { string } sourceDir
 * @param { string } buildName
*/
async function buildSingleHtml( sourceDir, buildName ) {
  const javascript = await getContentOf( sourceDir, '.js' ) ?? ''
  const css = await getContentOf( sourceDir, '.css' ) ?? ''
  await genBuild( javascript, css, buildName )
}

/**
 * @param { string } buildPath
*/
async function buildBlank( buildPath ) {
  await genBuild( '', '', buildPath )
}

main( process.argv.slice( 2 ) )  // eslint-disable-line
