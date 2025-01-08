import { SpryParticlesProps } from './SpryParticlesProps'

export interface DrawPropsDTO<T> {
  resolution: number
  aspectRatio: number
  color: string
  grid: number | [ number, number ] | undefined
  antialiasing: boolean | undefined
  tool: T
  toolSize: number | undefined
  spryParticles: SpryParticlesProps
}
