export interface _StartDTO {
  target: 'start'
  x: number
  y: number
  colorCode: string
  width: number
  height: number
  pixelListBuffer: ArrayBuffer
}

interface StopDTO {
  target: 'stop'
}

export type ControlDTO = _StartDTO | StopDTO
