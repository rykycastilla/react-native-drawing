import { access, constants } from 'node:fs/promises'
import { stringify } from '../libs/json-doc@1.0.0/index.js'
import { writeFile } from 'node:fs/promises'

const ENV_FILE = '.env.json'

async function main() {
  const fileExists = await checkFileExists( ENV_FILE )
  if( fileExists ) { return }
  const envContent = stringify( defaultEnv )
  await writeFile( ENV_FILE, envContent )
}

const defaultEnv = {
  PRODUCTION: false,
  WEB_CORE_DEV_IP: '127.0.0.1',
}

/**
 * @param { string } path
 * @returns { Promise<boolean> }
*/
async function checkFileExists( path ) {
  try {
    await access( path, constants.F_OK )
    return true
  }
  catch {
    return false
  }
}

main()
