import { CursorStyle } from '../../modules/cursor/models'
import { SprayParticlesProps } from './SprayParticlesProps'

export interface DrawPropsDTO<T> {
  backgroundColor: string | undefined
  resolution: number
  aspectRatio: number
  color: string
  grid: number | [ number, number ] | undefined
  antialiasing: boolean | undefined
  tool: T
  toolSize: number | undefined
  sprayParticles: SprayParticlesProps
  animatedFiller: boolean
  cursor: boolean | undefined
  cursorStyle: CursorStyle
}
