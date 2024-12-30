import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { getIndexableContentOf } from '../libs/indexable-dirs@1.0.0/index.js'
import { stringify } from '../libs/json-doc@1.0.0/index.js'
import { writeFile } from 'node:fs/promises'

const __filename = fileURLToPath( import.meta.url )
const __dirname = dirname( __filename )

const SOURCE_DIR = '../core/dist/assets/'
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
 * @param { string } mime
 * @param { string } input
 * @returns { string }
*/
function textToBase64Url( mime, input ) {
  const base64 = btoa( input )
  return `data:${ mime };base64,${ base64 }`
}

/**
 * @typedef { Object } WorkerSource
 * @property { string } name
 * @property { string } data
*/

/**
 * @param { string } javascript
 * @param { WorkerSource[] } workerList
 * @returns { string }
*/
function includeWorkers( javascript, workerList ) {
  for( const worker of workerList ) {
    const workerURLRawPattern = `"([^"]*(?:/[^"]*)*/${ worker.name })"`
    const workerURLPattern = new RegExp( workerURLRawPattern )
    const workerBase64URL = textToBase64Url( 'text/javascript', worker.data )
    javascript = javascript.replace( workerURLPattern, `"${ workerBase64URL }"` )
  }
  return javascript
}

/**
 * @param { string } buildPath
 * @param { string } css
 * @param { string } javascript
 * @param { WorkerSource[] } workerList
*/
async function genBuild( buildPath, css, javascript, workerList = [] ) {
  javascript = includeWorkers( javascript, workerList )
  const html = buildHtml( javascript, css )
  const buildContent = stringify( { html } )
  await writeFile( buildPath, buildContent )
}

/**
 * @param { string } sourceDir
 * @param { string } buildName
*/
async function buildSingleHtml( sourceDir, buildPath ) {
  const jsSource = await getIndexableContentOf( sourceDir, 'js' )
  const javascript = jsSource.index?.data ?? ''
  const cssSource = await getIndexableContentOf( sourceDir, 'css' )
  const css = cssSource.index?.data ?? ''
  await genBuild( buildPath, css, javascript, jsSource.content )
}

/**
 * @param { string } buildPath
*/
async function buildBlank( buildPath ) {
  await genBuild( buildPath, '', '' )
}

main( process.argv.slice( 2 ) )  // eslint-disable-line
