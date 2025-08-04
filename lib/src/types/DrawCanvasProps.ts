import { Tool } from '../shared/modules/tools/models'
import { ViewportWidth } from '../components/WebContainer'

export interface DrawCanvasProps {

  width?: ViewportWidth
  aspectRatio?: number
  resolution: number
  color: string
  grid?: number | [ number, number ]
  antialiasing?: boolean
  tool: Tool
  toolSize?: number
  sprayParticles?: { amount?:number, scale?:number }

  /** Provides animation for Filler tool. It is only supported in **Android** and **iOS** 16.4+ */
  animatedFiller?: boolean

}
