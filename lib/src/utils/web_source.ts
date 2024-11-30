import { html } from '../../../build.json'
import { PRODUCTION, WEB_CORE_DEV_IP } from '../../../.env.json'

interface ProductionSource {
  html: string
}

interface DevelopmentSource {
  uri: string
}

const uri = `http://${ WEB_CORE_DEV_IP }:5173/`

export const webSource: ProductionSource | DevelopmentSource  = PRODUCTION
  ? { html }
  : { uri }
