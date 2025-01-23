export interface _StartDTO {
  target: 'start'
  x: number
  y: number
  colorCode: string
  width: number
  height: number
  animatedFiller: boolean
  pixelListBuffer: ArrayBuffer
}

interface StopDTO {
  target: 'stop'
}

export type ControlDTO = _StartDTO | StopDTO
