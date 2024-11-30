import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { parse, stringify } from '../libs/json-doc@1.0.0/index.js'
import { readFile, writeFile } from 'node:fs/promises'

const __filename = fileURLToPath( import.meta.url )
const __dirname = dirname( __filename )

const ENV_PATH = '../lib/dist/.env.json'
const ENCODE = 'utf-8'

async function main() {
  const envPath = join( __dirname, ENV_PATH )
  /** @type { DataFile<Env> } */ const envFile = new DataFile( envPath )
  const env = await envFile.getContent()
  env.PRODUCTION = true
  await envFile.setContent( env )
}

/**
 * @callback ReadFunction
 * @param { string } path
 * @returns { Promise<string> }
*/

/**
 * @callback WriteFunction
 * @param { string } path
 * @param { string } content
 * @returns { Promise<void> }
*/

class TextFile {

  /** @readonly */ path
  /** @private @readonly */ read
  /** @private @readonly */ write

  /**
   * @param { string } path
   * @param { ReadFunction } read
   * @param { WriteFunction } write
   */
  constructor( path, read, write ) {
    this.path = path
    this.read = read
    this.write = write
  }

  /**
   * @public
   * @returns { Promise<string> }
   */
  getContent() {
    return this.read( this.path )
  }

  /**
   * @public
   * @param { string } content
  */
  async setContent( content ) {
    await this.write( this.path, content )
  }

}

/**
 * @callback StringifyFunction
 * @param { object } object
 * @returns { string }
*/

/**
 * @callback ParseFunction
 * @param { string } text
 * @returns { object }
*/

/**
 * @typedef { Object } JsonModule
 * @property { StringifyFunction } stringify
 * @property { ParseFunction } parse
*/

/**
 * @template T
 * @extends { TextFile }
*/
class JsonFile extends TextFile {

  /** @private @readonly */ json

  /**
   * @param { string } path
   * @param { ReadFunction } read
   * @param { WriteFunction } write
   * @param { JsonModule } json
  */
  constructor( path, read, write, json ) {
    super( path, read, write )
    this.json = json
  }

  /**
   * @public @override
   * @returns { Promise<T> }
  */
  async getContent() {
    const content = await super.getContent()
    return this.json.parse( content )
  }

  /**
   * @public @override
   * @param { T } content
  */
  async setContent( content ) {
    const jsonContent = this.json.stringify( content )
    await super.setContent( jsonContent )
  }

}

/**
 * @param { string } path
 * @returns { Promise<string> }
*/
async function read( path ) {
  let result
  try { result = await readFile( path, ENCODE ) }
  catch { result = '' }
  return result
}

/**
 * @param { string } path
 * @param { string } content
*/
async function write( path, content ) {
  try { await writeFile( path, content ) }
  catch { return }
}

/**
 * @template T
 * @extends { JsonFile<T> }
*/
class DataFile extends JsonFile {
  /**
   * @param { string } path
  */
  constructor( path ) {
    const json = { stringify, parse }
    super( path, read, write, json )
  }
}

/**
 * @typedef { Object } Env
 * @property { boolean } PRODUCTION
 * @property { string } WEB_CORE_DEV_IP
*/

main()
