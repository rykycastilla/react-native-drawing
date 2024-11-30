import { stringify } from '../libs/json-doc@1.0.0/index.js'
import { writeFile } from 'node:fs/promises'

const ENV_FILE = '.env.json'

async function main() {
  const envContent = stringify( defaultEnv )
  await writeFile( ENV_FILE, envContent )
}

const defaultEnv = {
  PRODUCTION: false,
  WEB_CORE_DEV_IP: '127.0.0.1',
}

main()
