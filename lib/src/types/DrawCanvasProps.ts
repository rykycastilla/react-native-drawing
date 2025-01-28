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
  spryParticles?: { amount?:number, scale?:number }
  animatedFiller?: boolean
}
